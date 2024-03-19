#!/usr/bin/python3
"""import module"""
from flask import jsonify, make_response, request
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from api.v1.views import app_views
from models import storage
from models.city import City
from models.worker import Worker
from models.user import User
from models.state import State
from models.service import Service
from utils.send_email import SendMail
from flasgger.utils import swag_from
import json


jwt = JWTManager()


@app_views.route("/cities/<int:city_id>/workers", strict_slashes=False, methods=["GET"])
@swag_from('documentation/worker/get_workers.yml', methods=['GET'])
def worker_by_city(city_id):
    """Retrieves the list of all workers objects of a City
    Retrieves a Place object.
    """
    city = storage.get(City, city_id)
    if city:
        result = []
        allworkers = city.workers
        for worker in allworkers:
            result.append(worker.to_dict())
        return jsonify(result), 200
    return make_response(jsonify({"error": "Not found"}), 404)


@app_views.route("/workers/<int:worker_id>", strict_slashes=False, methods=["GET"])
@swag_from('documentation/worker/get_worker.yml', methods=['GET'])
def workers(worker_id):
    """Retrieves the list of all workers objects of a City
    Retrieves a Place object.
    """
    worker = storage.get(Worker, worker_id)
    if worker:
        user = storage.get(User, worker.user_id).to_dict()
        del user['id']
        workerdict = worker.to_dict()
        workerdict.update(**user)
        workerdict['fullName'] = str(workerdict['first_name']) + " " + str(workerdict['last_name'])
        ServiceName = storage.get(Service, worker.service_id).en_name
        workerdict['ServiceName'] = ServiceName
        return jsonify(workerdict), 200
    return make_response(jsonify({"error": "Worker Not found"}), 404)


@app_views.route("/workers/<int:worker_id>", strict_slashes=False, methods=["DELETE"])
@swag_from('documentation/worker/delete_worker.yml', methods=['DELETE'])
def delete_worker(worker_id):
    """return a JSON: delete a worker object that match worker_id
    or Not found if the id not match any exist worker"""
    worker = storage.get(Worker, worker_id)
    if worker is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    storage.delete(worker)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/cities/<int:city_id>/workers",
                 strict_slashes=False,
                 methods=["POST"])
@swag_from('documentation/worker/post_worker.yml', methods=['POST'])
def create_worker(city_id):
    """
    If the city_id is not linked to any City object, raise a 404 error
    If the HTTP request body is not valid JSON,
    raise a 400 error with the message Not a JSON
    If the dictionary doesn’t contain the key user_id,
    raise a 400 error with the message Missing user_id
    If the user_id is not linked to any User object,
    raise a 404 error
    If the dictionary doesn’t contain the key name,
    raise a 400 error with the message Missing name
    Returns the new worker with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if not storage.get(City, city_id):
            return make_response(jsonify({"error": "City not found"}), 404)

        if "user_id" not in json_data:
            return make_response(jsonify({"error": "Missing user_id"}), 400)
        
        if "service_id" not in json_data:
            return make_response(jsonify({"error": "Missing service_id"}), 400)

        user_id = json_data["user_id"]
        if not storage.get(User, user_id):
            return make_response(jsonify({"error": "User not found"}), 404)
        
        service_id = json_data["service_id"]
        if not storage.get(Service, service_id):
            return make_response(jsonify({"error": "Service not found"}), 404)

        json_data["city_id"] = city_id
        instance = Worker(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    return make_response(jsonify({"error": "Not a JSON"}), 400)


@app_views.route("/workers/<int:worker_id>", strict_slashes=False, methods=["PUT"])
@swag_from('documentation/worker/put_worker.yml', methods=['PUT'])
def update_worker(worker_id):
    """update worker"""
    worker = storage.get(Worker, worker_id)
    if worker is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    worker.certifications = data.get("certifications", worker.certifications)
    worker.description = data.get("description", worker.description)
    worker.diplome = data.get("diplome", worker.diplome)
    worker.fb_url = data.get("fb_url", worker.fb_url)
    worker.insta_url = data.get("insta_url", worker.insta_url)
    worker.tiktok_url = data.get("tiktok_url", worker.tiktok_url)
    worker.linkedin_url = data.get("linkedin_url", worker.linkedin_url)
    worker.is_available = data.get("is_available", worker.is_available)
    worker.website_url = data.get("website_url", worker.website_url)
    worker.save()
    return jsonify(worker.to_dict()), 200


@app_views.route("/workers_search_post",
                 strict_slashes=False,
                 methods=["POST"])
def workers_search():
    """
    Search workers:
    That retrieves all worker objects depending of the JSON
    in the body of the request.
    The JSON can contain 3 optional keys:
    states: list of State ids
    cities: list of City ids
    amenities: list of Amenity ids
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data is None:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    result = []
    if len(json_data) == 0 or \
            all(value == [] for value in json_data.values()):
        workers = storage.all(Worker).values()
        for worker in workers:
            result.append(worker.to_dict())
        return jsonify(result)
    for state_id in json_data.get("states", []):
        state = storage.get(State, state_id)
        if state is None:
            return make_response(jsonify({"error": "Region not found"}), state_id)
        if state:
            for city in state.cities:
                if city:
                    for worker in city.workers:
                        result.append(worker)

    if len(json_data.get("cities", [])) > 0:
        result = []
    for city_id in json_data.get("cities", []):
        city = storage.get(City, city_id)
        if city is None:
            return make_response(jsonify({"error": "City not found"}), 404)
        if city:
            for worker in city.workers:
                if worker not in result:
                    result.append(worker)

    if len(result) == 0:
        result = list(storage.all(worker).values())
    for worker in result.copy():
        for service_id in json_data.get("services", []):
            service = storage.get(Service, service_id)
            if service is None:
                return make_response(jsonify({"error": "Service not found"}), 404)
            if service:
                if service.id != worker.service_id:
                    result.remove(worker)
                    break

    workers = []
    for worker in result:
        worker_dict = worker.to_dict()
        workers.append(worker_dict)
    return jsonify(workers), 200


@app_views.route("/workers/pages", strict_slashes=False, methods=["GET"])
@app_views.route("/workers/pages/", strict_slashes=False, methods=["GET"])
@app_views.route("/workers/pages/<int:page>/<int:limit>", strict_slashes=False, methods=["GET"])
def workers_with_offset(page=None, limit=None):
    """Retrieves a number of workers based on page and limit """
    if not page and not limit:
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=10, type=int)
    workers = storage.get_with_offset(Worker, offset=page, limit=limit).values()
    result = []
    for worker in workers:
        result.append(worker.to_dict())
    return jsonify(result), 200


@app_views.route("/workers_search", strict_slashes=False, methods=["GET"])
@app_views.route("/workers_search/", strict_slashes=False, methods=["GET"])
def workers_filter():
    """
    Search workers:
    Retrieves all worker objects depending on the query parameters in the URL.
    The parameters can include:
    - state: id of State
    - city: id of City
    - service: id of service
    """
    state_id = request.args.get("state", default=None, type=int)
    city_id = request.args.get("city", default=None, type=int)
    service_arg_str = request.args.get("service", default=None)
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    if service_arg_str is not None and service_arg_str.isdigit():
        service_id = int(service_arg_str)
    else:
        service_id = None
    state_id = state_id if state_id != "" else None
    city_id = city_id if city_id != "" else None
    service_id = service_id if service_id != "" else None
    page = page if page != "" else 1
    limit = limit if limit != "" else 10
    result = []
    index = limit * (page - 1)
    def GetAllWorkers():
        workers = storage.all(Worker).values()
        for worker in workers:
            user = storage.get(User, worker.user_id).to_dict()
            del user['id']
            workerdict = worker.to_dict()
            workerdict.update(**user)
            workerdict['fullName'] = str(workerdict['first_name']) + " " + str(workerdict['last_name'])
            ServiceName = storage.get(Service, worker.service_id).en_name
            workerdict['ServiceName'] = ServiceName
            result.append(workerdict)
        return result
    if state_id is None and city_id is None and service_id is None:
        print("in all None")
        result = GetAllWorkers()
        return make_response (jsonify(result[0:index + limit]), 200)
    # Filter by state
    if state_id is not None and city_id is None:
        print("in state_id")
        state = storage.get(State, state_id)
        if state is None:
            return make_response(jsonify({"error": "Region not found"}), 404)
        for city in state.cities:
            for worker in city.workers:
                user = storage.get(User, worker.user_id).to_dict()
                del user['id']
                workerdict = worker.to_dict()
                workerdict.update(**user)
                workerdict['fullName'] = str(workerdict['first_name']) + " " + str(workerdict['last_name'])
                ServiceName = storage.get(Service, worker.service_id).en_name
                workerdict['ServiceName'] = ServiceName
                result.append(workerdict)

    # Filter by city
    if city_id is not None:
        print("in city")
        state = storage.get(State, state_id)
        if state is None:
            return make_response(jsonify({"error": "State not found"}), 400)
        city = storage.get(City, city_id)
        if city:
            cities_in_states = state.cities
            if city not in cities_in_states:
                return make_response(jsonify({"error": "City not in this state"}), 400)
        if city is None:
            return make_response(jsonify({"error": "City not found"}), 404)
        for worker in city.workers:
            if worker not in result:
                user = storage.get(User, worker.user_id).to_dict()
                del user['id']
                workerdict = worker.to_dict()
                workerdict.update(**user)
                workerdict['fullName'] = str(workerdict['first_name']) + " " + str(workerdict['last_name'])
                ServiceName = storage.get(Service, worker.service_id).en_name
                workerdict['ServiceName'] = ServiceName
                result.append(workerdict)

    # Filter by service
    if service_id is not None:
        service = storage.get(Service, service_id)
        if service is None:
            return make_response(jsonify({"error": "Service not found"}), 404)
        if state_id is None and city_id is None:
            print("in None city state")
            result = GetAllWorkers()
        copy_result = result.copy()
        result = []
        for worker in copy_result:
            if worker.get("service_id") == service_id:
                result.append(worker)

    return jsonify(result[0:index + limit]), 200


@app_views.route("/worker_status", strict_slashes=False, methods=["PUT"])
@jwt_required()
def ChangeWorkerAvailability():
    json_data = request.get_json(force=True, silent=True)
    if not json_data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    current_user_id = get_jwt_identity()
    user = storage.get(User, current_user_id)
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 400)
    if "is_available" not in json_data:
        return make_response(jsonify({"error": "Availability state is missing"}), 400)
    state = json_data.get("is_available")
    worker = user.worker
    worker.is_available = state
    worker.save()
    return make_response(jsonify({"message": "Worker state updated successfully"}), 200)

@app_views.route("/contact_me", strict_slashes=False, methods=["POST"])
def contact_me():
    json_data = request.get_json(force=True, silent=True)
    if not json_data:
        return make_response(jsonify({"error": "Bad request , Not a json"}), 400)
    if "id" not in json_data:
        return make_response(jsonify({"error": "Please provide worker id"}), 400)
    worker_id = json_data.get("id")
    worker = storage.get(Worker, worker_id)
    if worker is None:
        return make_response(jsonify({"error": "Worker not found"}), 404)
    user = storage.get(User, worker.user_id)
    worker_email = user.email
    worker_name = user.first_name
    if "username" not in json_data or len(json_data["username"]) < 3:
        return make_response(jsonify({"error": "Name cannot be empty or less than 2 characters"}), 400)
    if "city" not in json_data or len(json_data["city"]) == 0:
        return make_response(jsonify({"error": "City cannot be empty"}), 400)
    if "phone" not in json_data or len(json_data["phone"]) < 10:
        return make_response(jsonify({"error": "Phone cannot be empty"}), 400)
    if "description" not in json_data or len(json_data["description"]) < 10 or len(json_data["description"]) > 100:
        return make_response(jsonify({"error": "Description must be between 10 and 100 characters"}), 400)
    if "date" not in json_data or len(json_data["date"]) == 0:
        return make_response(jsonify({"error": "Please provide start and end dates"}), 400)
    start_date = json_data.get("date").get("from", None)
    end_date = json_data.get("date").get("to", None)
    if start_date is None:
        return make_response(jsonify({"error": "Please provide start date"}), 400)
    if end_date is None:
        return make_response(jsonify({"error": "Please provide end date"}), 400)

    requester = json_data.get("username")
    city_of_work = json_data.get("city")
    contact_phone = json_data.get("phone")
    description_of_work = json_data.get("description")
    Subject = "New Job Request"
    content = f"""Dear {worker_name},
We have a new job request for you:

Requester: {requester}
City of work: {city_of_work}
Description of work: {description_of_work}
Start date: {start_date}
End date: {end_date}
To contact the requester, use this phone number: {contact_phone}

Please contact the requester as soon as possible, whether you are available for this work or not.

Best regards,
WorkHubConnect"""
    state = SendMail(worker_email, Subject, content)
    if state.status_code == 200:
        return jsonify({"message": "Job request submitted successfully"}), 200
    else:
        response_json = json.loads(state.data.decode('utf-8'))
        return jsonify({"error": f"{response_json['error']}"}), 500
    