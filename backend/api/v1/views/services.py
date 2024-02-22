#!/usr/bin/python3
"""Service objects that handles all default RESTFul API actions"""

from api.v1.views import app_views
from models import storage
from models.service import Service
from flask import make_response, request, jsonify


@app_views.route("/services/<int:service_id>", strict_slashes=False, methods=["GET"])
@app_views.route("/services", strict_slashes=False, methods=["GET"])
def services(service_id=None):
    """return a JSON: list of all Service objects or one Service,
    Or not found if id not exsit"""
    if service_id is None:
        result = []
        services = storage.all(Service).values()
        for service in services:
            result.append(service.to_dict())
        return jsonify(result)
    else:
        service = storage.get(Service, service_id)
        if service is None:
            return make_response(jsonify({"error": "Not found"}), 404)
        return jsonify(service.to_dict())


@app_views.route("/services/<int:service_id>",
                 strict_slashes=False,
                 methods=["DELETE"])
def delete_services(service_id):
    """return a JSON: delete a Service object that match Service_id
    or Not found if id not exist"""
    service = storage.get(Service, service_id)
    if service is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    storage.delete(service)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/services", strict_slashes=False, methods=["POST"])
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
                return make_response("Please enter a name (up to 128 characters). This field cannot be left empty", 400)
        else:
            return make_response("en_name not found", 400)
        if "ar_name" in json_data:
            if len(json_data['ar_name']) > 128 or len(json_data['ar_name']) == 0:
                return make_response("Please enter a name (up to 128 characters). This field cannot be left empty", 400)
        else:
            return make_response("ar_name not found", 400)
        if "description" in json_data:
            if len(json_data['description']) > 255 or len(json_data['description']) == 0:
                return make_response("Please enter a description (up to 255 characters). This field cannot be left empty", 400)
        else:
            return make_response("description not found", 400)
        instance = Service(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    else:
        return make_response("Not a JSON", 400)


@app_views.route("/services/<int:service_id>", strict_slashes=False, methods=["PUT"])
def Update_Service(service_id):
    """
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    Returns: the new Service with the status code 200
    """
    json_data = request.get_json(force=True, silent=True)
    if not json_data:
        return make_response("Not a JSON", 400)
    obj = storage.get(Service, service_id)
    if obj is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    if "en_name" in json_data and (len(json_data['en_name']) > 128 or len(json_data['en_name']) == 0):
        return make_response("Please enter an english name (up to 128 characters). This field cannot be left empty", 400)
    if "ar_name" in json_data and (len(json_data['ar_name']) > 128 or len(json_data['ar_name']) == 0):
        return make_response("Please enter an arabic name (up to 128 characters). This field cannot be left empty", 400)
    if "description" in json_data and (len(json_data['description']) > 255 or len(json_data['description']) == 0):
        return make_response("Please enter a description (up to 255 characters). This field cannot be left empty", 400)
    obj.en_name = json_data.get("en_name", obj.en_name)
    obj.ar_name = json_data.get("ar_name", obj.ar_name)
    obj.description = json_data.get("description", obj.description)
    obj.save()
    return jsonify(obj.to_dict()), 200
