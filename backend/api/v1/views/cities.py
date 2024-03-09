#!/usr/bin/python3
"""State objects that handles all default RESTFul API"""

from flask import jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.city import City
from models.state import State
from flasgger.utils import swag_from


@app_views.route("/states/<int:state_id>/cities", strict_slashes=False, methods=["GET"])
@swag_from('documentation/city/cities_by_state.yml', methods=['GET'])
def cities(state_id):
    """Retrieves the list of all City objects of a State"""
    state = storage.get(State, state_id)
    if state:
        result = []
        cities = state.cities
        for city in cities:
            result.append(city.to_dict())
        return jsonify(result), 200
    return make_response(jsonify({"error": "Not found"}), 404)


@app_views.route("/cities/<int:city_id>", strict_slashes=False,  methods=["GET"])
@swag_from('documentation/city/get_city.yml', methods=['GET'])
def cities_id(city_id):
    """Retrieves the list of all City objects of a State"""
    city = storage.get(City, city_id)
    if city:
        return jsonify(city.to_dict()), 200
    return make_response(jsonify({"error": "Not found"}), 404)


@app_views.route("/cities/<int:city_id>", strict_slashes=False, methods=["DELETE"])
@swag_from('documentation/city/delete_city.yml', methods=['DELETE'])
def delete_city(city_id):
    """return a JSON: delete a state object that match city_id
    or Not found if id not exist"""
    city = storage.get(City, city_id)
    if city is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    storage.delete(city)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/states/<int:state_id>/cities",
                 strict_slashes=False,
                 methods=["POST"])
@swag_from('documentation/city/post_city.yml', methods=['POST'])
def Create_city(state_id):
    """
    If the state_id is not linked to any State object
        raise a 404 error
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    If the dictionary doesn't contain the key name,
        raise a 400 error with the message Missing name
    Returns: the new State with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if not storage.get(State, state_id):
            return make_response(jsonify({"error": "Not found"}), 404)
        if "name" in json_data:
            if len(json_data['name']) > 128:
                return make_response(jsonify({"error": "Input name must be less than 128 characters"}), 400)
            json_data["state_id"] = state_id
            instance = City(**json_data)
            instance.save()
            return make_response(jsonify(instance.to_dict()), 201)
        else:
            return make_response(jsonify({"error": "Missing name"}), 400)
    else:
        return make_response(jsonify({"error": "Not found"}), 400)


@app_views.route("/cities/<int:city_id>", strict_slashes=False, methods=["PUT"])
@swag_from('documentation/city/put_city.yml', methods=['PUT'])
def Update_city(city_id):
    """update city"""
    city = storage.get(City, city_id)
    if city is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if len(data['name']) > 128:
        return make_response(jsonify({"error": "Input name must be less than 128 characters"}), 400)
    city.name = data.get("name", city.name)
    city.save()
    return jsonify(city.to_dict()), 200




@app_views.route("/cities/pages/", strict_slashes=False, methods=["GET"])
@app_views.route("/cities/pages", strict_slashes=False, methods=["GET"])
@app_views.route("/cities/pages/<int:page>/<int:limit>", strict_slashes=False, methods=["GET"])
def cities_with_offset(page=None, limit=None):
    """Retrieves a number of cities based on page and limit """
    if not page and not limit:
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=10, type=int)
    cities = storage.get_with_offset(City, offset=page, limit=limit).values()
    result = []
    for city in cities:
        result.append(city.to_dict())
    return jsonify(result), 200 , {'Content-Type': 'application/json; charset=utf-8'}
