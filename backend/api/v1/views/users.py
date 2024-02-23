#!/usr/bin/python3
"""Importing modules"""
import hashlib

from flask import jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.user import User
from models.city import City
from models.state import State
from models.service import Service
import re

email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

def is_valid_email(email):
    return re.match(email_regex, email) is not None

phone_regex = r'^(\+212|0)([5-7]\d{8}|[6-7]\d{8})$'

def is_valid_phone_number(phone):
    return re.match(phone_regex, phone) is not None


@app_views.route("/users/<int:user_id>", strict_slashes=False, methods=["GET"])
@app_views.route("/users", strict_slashes=False, methods=["GET"])
def users(user_id=None):
    """return a JSON: list of all users objects or one User,
    Or not found if id not exsit"""
    if user_id is None:
        result = []
        users = storage.all(User).values()
        for user in users:
            result.append(user.to_dict())
        return jsonify(result)
    else:
        user = storage.get(User, user_id)
        if user is None:
            return make_response(jsonify({"error": "User Not found"}), 404)
        if user.worker is None:
            user_data = user.to_dict()
            user_data['type'] = "client"
        else:
            user_data = user.to_dict()
            service_id = user.worker.service_id
            ServiceName = storage.get(Service, service_id).en_name
            CityName = storage.get(City, user.city_id).name
            StateName = storage.get(State, (storage.get(City, user.city_id).state_id)).name
            user_data['service'] = ServiceName
            user_data['city'] = CityName
            user_data['region'] = StateName
            user_data['type'] = "worker"
            worker_data = user.worker.to_dict()
            del worker_data['__class__']
            user_data.update(worker_data)
        
        city = storage.get(City, user.city_id)
        StateName = storage.get(State, city.state_id).name
        user_data['city'] = city.name
        user_data['region'] = StateName
        del user_data['worker']
        del user_data['__class__']
        return jsonify(user_data)


@app_views.route("/users/<int:user_id>", strict_slashes=False, methods=["DELETE"])
def delete_user(user_id):
    """return a JSON: delete a User object that match <user_id>
    or Not found if id not exist"""
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    storage.delete(user)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/users/<user_id>", strict_slashes=False,
                 methods=["PUT"])
def update_user(user_id):
    """update user"""
    # print("in user")
    obj = storage.get(User, user_id)
    if obj is None:
        return make_response(jsonify({"error": "User Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response("Not a JSON", 400)
    if len(data.get("password", "")) > 80:
        return make_response("Input password must be less than 80 characters", 400)
    if "city_id" in data and not storage.get(City, data['city_id']):
        return make_response(jsonify({"error": "city not found"}), 400)
    if len(data.get("first_name", "")) > 20:
        return make_response("Input first_name must be less than 20 characters", 400)
    if len(data.get("last_name", "")) > 20:
        return make_response("Input last_name must be less than 20 characters", 400)
    phone = data.get('phone_number', "")
    if len(phone) > 0:
        Phone = phone.replace(" ", "")
        if not is_valid_phone_number(Phone):
            return make_response("invalid phone Number most be (+212..) or (06...) or (07..) or (05...)", 400)
        if len(Phone) > 16:
            return make_response("Input phone_number must be less than 16 characters", 400)
        data['phone_number'] = Phone
    # fix problem encrection password 2 times.
    pss = data.get("password", None)
    if pss:
        obj.password = pss
    obj.first_name = data.get("first_name", obj.first_name)
    obj.last_name = data.get("last_name", obj.last_name)
    obj.phone_number = data.get("phone_number", obj.phone_number)
    obj.is_active = data.get("is_active", obj.is_active)
    obj.city_id = data.get("city_id", obj.city_id)
    obj.save()
    return jsonify(obj.to_dict()), 200


@app_views.route("/users", strict_slashes=False, methods=["POST"])
def Create_user():
    """
    Create User :

    If the HTTP body request is not valid JSON,
    raise a 400 error with the message Not a JSON
    If the dictionary doesn't contain the key email and password,
    raise a 400 error with the message Missing email,
    or Missing password
    Returns: the new User with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if "email" not in json_data:
            return make_response("Missing email", 400)
        if not is_valid_email(json_data['email']):
            return make_response("invalid address email", 400)
        if len(json_data['email']) > 50:
            return make_response("Input email must be less than 50 characters", 400)

        if "password" not in json_data:
            return make_response("Missing password", 400)
        if len(json_data['password']) > 80:
            return make_response("Input password must be less than 80 characters", 400)
        if len(json_data['password']) < 6:
            return make_response("Password very weak. It should be at least 6 characters long.", 400)
        # most cast city id.
        if "city_id" not in json_data:
            return make_response("Missing city_id", 400)
        if not storage.get(City, json_data['city_id']):
            return make_response(jsonify({"error": "city not found"}), 400)

        if len(json_data.get('first_name', "")) > 20:
            return make_response("Input first_name must be less than 20 characters", 400)
        if len(json_data.get('last_name', "")) > 20:
            return make_response("Input last_name must be less than 20 characters", 400)

        phone = json_data.get('phone_number', "")
        if len(phone) > 0:
            Phone = phone.replace(" ", "")
            if not is_valid_phone_number(Phone):
                return make_response("invalid phone Number most be (+212..) or (06...) or (07..) or (05...)", 400)
            if len(Phone) > 16:
                return make_response("Input phone_number must be less than 16 characters", 400)
            json_data['phone_number'] = Phone
        users = storage.all(User).values()
        for user in users:
            if (user.email == json_data['email']):
                return make_response("Email already exists", 400)
        if 'id' in json_data:
            del json_data['id']
        instance = User(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    else:
        return make_response("Not a JSON", 400)



@app_views.route("/users/page/", strict_slashes=False, methods=["GET"])
@app_views.route("/users/page/<int:offset>", strict_slashes=False, methods=["GET"])
def users_with_offset(offset=1):
    """Retrieves 10 users list with offset """
    
    users = storage.get_with_offset(User, offset=offset).values()
    result = []
    for user in users:
        result.append(user.to_dict())
    return jsonify(result), 200