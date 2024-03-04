#!/usr/bin/python3
"""State objects that handles all default RESTFul API actions"""

from api.v1.views import app_views
from models import storage
from models.state import State
from flask import make_response, request, jsonify
from flasgger.utils import swag_from


@app_views.route("/states", strict_slashes=False, methods=["GET"])
@swag_from('documentation/state/get_state.yml', methods=['GET'])
def states():
    """return a JSON: list of all State objects or one State,
    Or not found if id not exsit"""
    result = []
    states = storage.all(State).values()
    for state in states:
        result.append(state.to_dict())
    return jsonify(result)

@app_views.route("/states/<int:state_id>", strict_slashes=False, methods=["GET"])
@swag_from('documentation/state/get_id_state.yml', methods=['GET'])
def states_id(state_id):
    """return a JSON: list of all State objects or one State,
    Or not found if id not exsit"""
    state = storage.get(State, state_id)
    if state is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    return jsonify(state.to_dict())


@app_views.route("/states/<int:state_id>",
                 strict_slashes=False,
                 methods=["DELETE"])
@swag_from('documentation/state/delete_state.yml', methods=['DELETE'])
def delete_states(state_id):
    """return a JSON: delete a state object that match State_id
    or Not found if id not exist"""
    state = storage.get(State, state_id)
    if state is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    storage.delete(state)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/states", strict_slashes=False, methods=["POST"])
@swag_from('documentation/state/post_state.yml', methods=['POST'])
def Create_state():
    """
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    If the dictionary doesn't contain the key name,
        raise a 400 error with the message Missing name
    Returns: the new State with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if "name" in json_data:
            if len(json_data['name']) > 128:
                return make_response(jsonify({"error": "Input name must be less than 128 characters"}), 400)
            instance = State(**json_data)
            instance.save()
            return make_response(jsonify(instance.to_dict()), 201)
        else:
            return make_response(jsonify({"error": "Missing name"}), 400)
    else:
        return make_response(jsonify({"error": "Not a JSON"}), 400)


@app_views.route("/states/<int:state_id>", strict_slashes=False, methods=["PUT"])
@swag_from('documentation/state/put_state.yml', methods=['PUT'])
def Update_state(state_id):
    """
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    Returns: the new State with the status code 200
    """
    obj = storage.get(State, state_id)
    if obj is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response("Not a JSON", 400)
    if len(data['name']) > 128:
        return make_response(jsonify({"error": "Input name must be less than 128 characters"}), 400)
    obj.name = data.get("name", obj.name)
    obj.save()
    return jsonify(obj.to_dict()), 200
