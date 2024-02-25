#!/usr/bin/python3
"""import module"""
from flask import jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.city import City
from models.worker import Worker
from models.user import User
from models.state import State
from models.service import Service


@app_views.route("/cities/<int:city_id>/workers",
                 strict_slashes=False,
                 methods=["GET"])
@app_views.route("/workers/<int:worker_id>", strict_slashes=False, methods=["GET"])
def workers(city_id=None, worker_id=None):
    """Retrieves the list of all workers objects of a City
    Retrieves a Place object.
    """
    if city_id:
        city = storage.get(City, city_id)
        if city:
            result = []
            allworkers = city.workers
            for worker in allworkers:
                result.append(worker.to_dict())
            return jsonify(result), 200
    if worker_id:
        worker = storage.get(Worker, worker_id)
        if worker:
            return jsonify(worker.to_dict()), 200
    return make_response(jsonify({"error": "Not found"}), 404)


@app_views.route("/workers/<int:worker_id>",
                 strict_slashes=False,
                 methods=["DELETE"])
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
    worker.website_url = data.get("website_url", worker.website_url)
    # worker.user_id = worker.user_id
    worker.save()
    return jsonify(worker.to_dict()), 200


@app_views.route("/workers_search",
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
        # if 'amenities' in worker_dict:
        #     del worker_dict['amenities']
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
    service_id = request.args.get("service", default=None, type=int)
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    result = []
    index = limit * (page - 1)
    # page 2 : 11 -- 20
    if state_id is None and city_id is None and service_id is None:
        workers = storage.all(Worker).values()
        for worker in workers:
            result.append(worker.to_dict())
        return jsonify(result[index:index + limit])
    # Filter by state
    if state_id is not None:
        state = storage.get(State, state_id)
        if state is None:
            return make_response(jsonify({"error": "Region not found"}), 404)
        for city in state.cities:
            for worker in city.workers:
                result.append(worker)

    # Filter by city
    if city_id is not None:
        result = []
        city = storage.get(City, city_id)
        if city is None:
            return make_response(jsonify({"error": "City not found"}), 404)
        for worker in city.workers:
            if worker not in result:
                result.append(worker)

    # Filter by service
    if service_id is not None:
        service = storage.get(Service, service_id)
        if service is None:
            return make_response(jsonify({"error": "Service not found"}), 404)
        result = [worker for worker in result if worker.service_id == service.id]

    workers = [worker.to_dict() for worker in result]
    return jsonify(workers), 200
