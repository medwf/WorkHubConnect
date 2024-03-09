#!/usr/bin/python3
"""Service objects that handles all default RESTFul API actions"""

from api.v1.views import app_views
from models import storage
from models.service import Service
from flask import make_response, request, jsonify
from flasgger.utils import swag_from


@app_views.route("/services", strict_slashes=False, methods=["GET"])
@swag_from('documentation/service/get_services.yml', methods=['GET'])
def services():
    """return a JSON: list of all Service objects or one Service,
    Or not found if id not exsit"""
    result = []
    services = storage.all(Service).values()
    for service in services:
        nbworkers = len(service.workers)
        servicedict = service.to_dict()
        del servicedict['workers']
        servicedict['nbworkers'] = nbworkers
        result.append(servicedict)
    return jsonify(result)


@app_views.route("/services/<int:service_id>", strict_slashes=False, methods=["GET"])
@swag_from('documentation/service/get_service.yml', methods=['GET'])
def service_id(service_id):
    """return a JSON: list of all Service objects or one Service,
    Or not found if id not exsit"""
    service = storage.get(Service, service_id)
    if service is None:
        return make_response(jsonify({"error": "Service Not found"}), 404)
    
    nbworkers = len(service.workers)
    servicedict = service.to_dict()
    del servicedict['workers']
    servicedict['nbworkers'] = nbworkers
    return jsonify(servicedict)


@app_views.route("/services/<int:service_id>",
                 strict_slashes=False,
                 methods=["DELETE"])
@swag_from('documentation/service/delete_service.yml', methods=['DELETE'])
def delete_services(service_id):
    """return a JSON: delete a Service object that match Service_id
    or Not found if id not exist"""
    service = storage.get(Service, service_id)
    if service is None:
        return make_response(jsonify({"error": "Service Not found"}), 404)
    storage.delete(service)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/services", strict_slashes=False, methods=["POST"])
@swag_from('documentation/service/post_service.yml', methods=['POST'])
def Create_Service():
    """
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    If the dictionary doesn't contain the key name,
        raise a 400 error with the message Missing name
    Returns: the new Service with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if "en_name" in json_data:
            if len(json_data['en_name']) > 128 or len(json_data['en_name']) == 0:
                return make_response(jsonify({"error": "Please enter a en_name (up to 128 characters). This field cannot be left empty"}), 400)
        else:
            return make_response(jsonify({"error": "Missing service name in english"}), 400)
        if "ar_name" in json_data:
            if len(json_data['ar_name']) > 128 or len(json_data['ar_name']) == 0:
                return make_response(jsonify({"error": "Please enter an arabic name (up to 128 characters). This field cannot be left empty"}), 400)
        else:
            return make_response(jsonify({"error": "Missing service name in arabic"}), 400)
        if "description" in json_data:
            if len(json_data['description']) > 255 or len(json_data['description']) == 0:
                return make_response(jsonify({"error": "Please enter a description (up to 255 characters). This field cannot be left empty"}), 400)
        else:
            return make_response(jsonify({"error":"description not found"}), 400)
        instance = Service(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    else:
        return make_response(jsonify({"error": "Not a JSON"}), 400)


@app_views.route("/services/<int:service_id>", strict_slashes=False, methods=["PUT"])
@swag_from('documentation/service/put_service.yml', methods=['PUT'])
def Update_Service(service_id):
    """
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    Returns: the new Service with the status code 200
    """
    json_data = request.get_json(force=True, silent=True)
    # print("json data is:",json_data)
    if not json_data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    service = storage.get(Service, service_id)
    if service is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    if "en_name" in json_data and (len(json_data['en_name']) > 128 or len(json_data['en_name']) == 0):
        return make_response(jsonify({"error":"Please enter an english name (up to 128 characters). This field cannot be left empty"}), 400)
    if "ar_name" in json_data and (len(json_data['ar_name']) > 128 or len(json_data['ar_name']) == 0):
        return make_response(jsonify({"error": "Please enter an arabic name (up to 128 characters). This field cannot be left empty"}), 400)
    if "description" in json_data and (len(json_data['description']) > 255 or len(json_data['description']) == 0):
        return make_response(jsonify({"error": "Please enter a description (up to 255 characters). This field cannot be left empty"}), 400)
    service.en_name = json_data.get("en_name", service.en_name)
    service.ar_name = json_data.get("ar_name", service.ar_name)
    service.description = json_data.get("description", service.description)
    service.save()
    return jsonify(service.to_dict()), 200



@app_views.route("/popular_services", strict_slashes=False, methods=["GET"])
# @swag_from('documentation/service/get_services.yml', methods=['GET'])
def PopularServices():
    """return a JSON: list of all Service objects or one Service,
    Or not found if id not exsit"""
    limit = request.args.get('limit', default=10, type=int)
    result = []
    services = storage.all(Service).values()
    for service in services:
        nbworkers = len(service.workers)
        servicedict = service.to_dict()
        del servicedict['workers']
        servicedict['nbworkers'] = nbworkers
        result.append(servicedict)
        sorted_result = sorted(result, key=lambda x: x["nbworkers"], reverse=True)
    return make_response(jsonify(sorted_result[:limit]), 200)