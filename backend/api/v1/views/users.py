#!/usr/bin/python3
"""Importing modules"""

from flask import jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.user import User
from models.city import City
from models.state import State
from models.service import Service
from models.worker import Worker
from flask_jwt_extended import jwt_required, get_jwt_identity
import magic
import re, os
from utils.upload import generate_filename, check_image_size
from flasgger.utils import swag_from

email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

def is_valid_email(email):
    return re.match(email_regex, email) is not None

phone_regex = r'^(\+212|0)([5-7]\d{8}|[6-7]\d{8})$'

def is_valid_phone_number(phone):
    return re.match(phone_regex, phone) is not None


@app_views.route("/users", strict_slashes=False, methods=["GET"])
@swag_from('documentation/user/all_users.yml', methods=["GET"])
def users():
    """return a JSON: list of all users objects or one User,
    Or not found if id not exsit"""
    result = []
    users = storage.all(User).values()
    for user in users:
        result.append(user.to_dict())
    return jsonify(result)


@app_views.route("/users/<int:user_id>", strict_slashes=False, methods=["GET"])
@swag_from('documentation/user/get_user.yml', methods=["GET"])
def users_id(user_id):
    """return a JSON: list of all users objects or one User,
    Or not found if id not exist"""
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
        # del worker_data['__class__']
        user_data.update(worker_data)
    
    city = storage.get(City, user.city_id)
    StateName = storage.get(State, city.state_id).name
    user_data['city'] = city.name
    user_data['region'] = StateName
    del user_data['worker']
    # del user_data['__class__']
    return jsonify(user_data)

@app_views.route("/users/<int:user_id>", strict_slashes=False, methods=["DELETE"])
@swag_from('documentation/user/delete_user.yml', methods=['DELETE'])
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
@swag_from('documentation/user/put_user.yml', methods=['PUT'])
def update_user(user_id):
    """update user"""
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "User Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if len(data.get("password", "")) > 16:
        return make_response(jsonify({"error": "Input password must be less than 16 characters"}), 400)
    if "city_id" in data and not storage.get(City, data['city_id']):
        return make_response(jsonify({"error": "city not found"}), 400)
    if len(data.get('first_name')) > 20 or len(data.get('first_name')) < 3:
        return make_response(jsonify({"error": "Input first_name must be between 3 and 20 characters"}), 400)
    if len(data.get('last_name')) > 20 or len(data.get('last_name')) < 3:
        return make_response(jsonify({"error": "Input last_name must be between 3 and 20 characters"}), 400)
    phone = data.get('phone_number', "")
    if len(phone) > 0:
        Phone = phone.replace(" ", "")
        if not is_valid_phone_number(Phone):
            return make_response(jsonify({"error": "invalid phone Number most be (+212..) or (06...) or (07..) or (05...)"}), 400)
        if len(Phone) > 16:
            return make_response(jsonify({"error": "Input phone_number must be less than 16 characters"}), 400)
        data['phone_number'] = Phone
    # fix problem encryption password 2 times.jsonify({"error": 
    pss = data.get("password", None)
    if pss:
        user.password = pss
    user.first_name = data.get("first_name", user.first_name)
    user.last_name = data.get("last_name", user.last_name)
    user.phone_number = data.get("phone_number", user.phone_number)
    user.is_active = data.get("is_active", user.is_active)
    user.city_id = data.get("city_id", user.city_id)
    user.save()
    return jsonify(user.to_dict()), 200


@app_views.route("/users", strict_slashes=False, methods=["POST"])
@swag_from('documentation/user/post_user.yml', methods=['POST'])
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
            return make_response(jsonify({"error": "Missing email"}), 400)
        if not is_valid_email(json_data['email']):
            return make_response(jsonify({"error": "invalid address email"}), 400)
        if len(json_data['email']) > 50:
            return make_response(jsonify({"error": "Input email must be less than 50 characters"}), 400)

        if "password" not in json_data:
            return make_response(jsonify({"error": "Missing password"}), 400)
        if len(json_data['password']) > 16:
            return make_response(jsonify({"error": "Input password must be less than 16 characters"}), 400)
        if len(json_data['password']) < 6:
            return make_response(jsonify({"error": "Password very weak. It should be at least 6 characters long."}), 400)
        # most cast city id.
        if "city_id" not in json_data:
            return make_response(jsonify({"error": "Missing city_id"}), 400)
        if not storage.get(City, json_data['city_id']):
            return make_response(jsonify({"error": "city not found"}), 400)

        if "first_name" not in json_data:
            return make_response(jsonify({"error": "Missing first name"}), 400)
        if len(json_data.get('first_name')) > 20 or len(json_data.get('first_name')) < 3:
            return make_response(jsonify({"error": "Input first_name must be between 3 and 20 characters"}), 400)
        
        if "last_name" not in json_data:
            return make_response(jsonify({"error": "Missing last name"}), 400)
        if len(json_data.get('last_name')) > 20 or len(json_data.get('last_name')) < 3:
            return make_response(jsonify({"error": "Input last_name must be between 3 and 20 characters"}), 400)

        phone = json_data.get('phone_number', "")
        if len(phone) > 0:
            Phone = phone.replace(" ", "")
            if not is_valid_phone_number(Phone):
                return make_response(jsonify({"error": "invalid phone Number most be (+212..) or (06...) or (07..) or (05...)"}), 400)
            if len(Phone) > 16:
                return make_response(jsonify({"error": "Input phone_number must be less than 16 characters"}), 400)
            json_data['phone_number'] = Phone
        users = storage.all(User).values()
        for user in users:
            if (user.email == json_data['email']):
                return make_response(jsonify({"error": "Email already exists"}), 400)
        if 'id' in json_data:
            del json_data['id']
        instance = User(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    else:
        return make_response(jsonify({"error": "Not a JSON"}), 400)


@app_views.route("/users/page/", strict_slashes=False, methods=["GET"])
@app_views.route("/users/page/<int:offset>", strict_slashes=False, methods=["GET"])
# @swag_from('documentation/user/offset_user.yml', methods=['GET'])
def users_with_offset(offset=1):
    """Retrieves 10 users list with offset """
    
    users = storage.get_with_offset(User, offset=offset).values()
    result = []
    for user in users:
        result.append(user.to_dict())
    return jsonify(result), 200


@app_views.route("/uploadprofile", strict_slashes=False, methods=["POST"])
@jwt_required()
def upload_img():
    if request.method == 'POST':
        if 'files' not in request.files:
            print("no selected file")
            return make_response(jsonify({"error": "No selected file"}), 400)
        file = request.files['files']
        if file.filename == '':
            return make_response(jsonify({"error": "No selected file"}), 400)

        allowed_extensions = ("png", "jpeg", "jpg")
        allowed_mime_types = ("image/jpeg", "image/png", "image/jpg")
        basename, file_extension = file.filename.rsplit('.', 1)
        if file_extension.lower() not in allowed_extensions:
            return make_response(jsonify({"error": "Please upload images in one of the following formats: PNG, JPEG, or JPG"}))
        current_user_id = get_jwt_identity()
        user_info = f"profile_{current_user_id}"
        new_filename = generate_filename(file_extension, user_info)
        user = storage.get(User, current_user_id)
        # print(user.email)
        current_directory = os.getcwd()
        os.makedirs('images/users/', exist_ok=True)
        file.save('images/users/' + new_filename)
        
        file_path = f"{current_directory}/images/users/{new_filename}"
        mime = magic.Magic(mime=True)
        file_mime_type = mime.from_file(file_path)
        if file_mime_type not in allowed_mime_types:
            os.remove(file_path)
            return make_response(jsonify({"error": "Please upload images in one of the following mime_types : PNG, JPEG, or JPG"}))
        is_valid = check_image_size(file_path)
        if not is_valid:
            return jsonify({"error": "Image size must be less than 2MB"})
        new_img = f"users/{new_filename}"

        if os.path.exists(file_path):
            if user.profile_img:
                try:
                    path_oldimg = f"{current_directory}/images/{user.profile_img}"
                    os.remove(path_oldimg)
                except:
                    pass
        user.profile_img = new_img
        user.save()
        response_data = {"message": "Profile image updated successfully", "url": (new_img)}
        return make_response (jsonify(response_data),200)



@app_views.route("/updateprofile", strict_slashes=False, methods=["PUT"])
@jwt_required()
def update_client_worker():
    """
    Update User :

    If the HTTP body request is not valid JSON,
    raise a 400 error with the message Not a JSON
    Returns: the message with the status code 200
    """

    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if len(json_data) > 0 and 'type' not in json_data or json_data['type'] not in ("client", "worker"):
            # print("type not found")
            return make_response(jsonify({"error": "Invalid request"}), 400)
        user_id = get_jwt_identity()
        user = storage.get(User, user_id)
        if user is None:
            return make_response(jsonify({"error": "User not found"}), 400)
        if user.worker is None:
            currenttype = "client"
        else:
            currenttype = "worker"

        #update in case worker and still worker
        if json_data['type'] == 'worker' and currenttype == 'worker':
            user_keys = ['first_name', 'last_name', 'city_id', 'profile_img', 'phone_number', 'is_active']
            user_data = {key: json_data[key] for key in user_keys if key in json_data}
            worker_keys = ['user_id', 'service_id', 'city_id', 'description', 'diplome', 'certifications',
                           'fb_url', 'insta_url','tiktok_url', 'linkedin_url', 'website_url']
            worker_data = {key: json_data[key] for key in worker_keys if key in json_data}

            if not storage.get(City, user_data.get('city_id', None)):
                return make_response(jsonify({"error": "city not found"}), 400)
            if len(user_data.get('first_name')) > 20 or len(user_data.get('first_name')) < 3:
                return make_response(jsonify({"error": "Input first_name must be between 3 and 20 characters"}), 400)
            if len(user_data.get('last_name')) > 20 or len(user_data.get('last_name')) < 3:
                return make_response(jsonify({"error": "Input last_name must be between 3 and 20 characters"}), 400)
            phone = user_data.get('phone_number', "")
            if len(phone) > 0:
                Phone = phone.replace(" ", "")
                if not is_valid_phone_number(Phone):
                    return make_response(jsonify({"error": "invalid phone Number most be (+212..) or (06...) or (07..) or (05...)"}), 400)
                if len(Phone) > 16:
                    return make_response(jsonify({"error": "Input phone_number must be less than 16 characters"}), 400)
                user_data['phone_number'] = Phone
            user.first_name = user_data.get("first_name", user.first_name)
            user.last_name = user_data.get("last_name", user.last_name)
            user.phone_number = user_data.get("phone_number", user.phone_number)
            user.is_active = user_data.get("is_active", user.is_active)
            user.city_id = user_data.get("city_id", user.city_id)
            service_id = worker_data["service_id"]
            if not storage.get(Service, service_id):
                return make_response(jsonify({"error": "Service not found"}), 404)
            worker = user.worker
            worker.service_id = worker_data.get("service_id", worker.service_id)
            worker.certifications = worker_data.get("certifications", worker.certifications)
            worker.description = worker_data.get("description", worker.description)
            worker.diplome = worker_data.get("diplome", worker.diplome)
            worker.fb_url = worker_data.get("fb_url", worker.fb_url)
            worker.insta_url = worker_data.get("insta_url", worker.insta_url)
            worker.tiktok_url = worker_data.get("tiktok_url", worker.tiktok_url)
            worker.linkedin_url = worker_data.get("linkedin_url", worker.linkedin_url)
            # worker.is_available = worker_data.get("is_available", worker.is_available)
            worker.website_url = worker_data.get("website_url", worker.website_url)
            user.save()
            worker.save()
            return make_response(jsonify({"message": "Profile Updated Successfully"}), 200)


        # update in case client and still client
        if json_data['type'] == 'client' and currenttype == 'client':
            user_keys = ['first_name', 'last_name', 'city_id', 'profile_img', 'phone_number', 'is_active']
            user_data = {key: json_data[key] for key in user_keys if key in json_data}

            if not storage.get(City, user_data.get('city_id', None)):
                return make_response(jsonify({"error": "city not found"}), 400)
            if len(user_data.get('first_name')) > 20 or len(user_data.get('first_name')) < 3:
                return make_response(jsonify({"error": "Input first_name must be between 3 and 20 characters"}), 400)
            if len(user_data.get('last_name')) > 20 or len(user_data.get('last_name')) < 3:
                return make_response(jsonify({"error": "Input last_name must be between 3 and 20 characters"}), 400)
            phone = user_data.get('phone_number', "")
            if len(phone) > 0:
                Phone = phone.replace(" ", "")
                if not is_valid_phone_number(Phone):
                    return make_response(jsonify({"error": "invalid phone Number most be (+212..) or (06...) or (07..) or (05...)"}), 400)
                if len(Phone) > 16:
                    return make_response(jsonify({"error": "Input phone_number must be less than 16 characters"}), 400)
                user_data['phone_number'] = Phone
            user.first_name = user_data.get("first_name", user.first_name)
            user.last_name = user_data.get("last_name", user.last_name)
            user.phone_number = user_data.get("phone_number", user.phone_number)
            user.is_active = user_data.get("is_active", user.is_active)
            user.city_id = user_data.get("city_id", user.city_id)
            user.save()
            return make_response(jsonify({"message": "Profile Updated Successfully"}), 200)


        #update in case client become a worker
        if json_data['type'] == 'worker' and currenttype == 'client':
            user_keys = ['first_name', 'last_name', 'city_id', 'profile_img', 'phone_number', 'is_active']
            user_data = {key: json_data[key] for key in user_keys if key in json_data}
            worker_keys = ['user_id', 'service_id', 'city_id', 'description', 'diplome', 'certifications',
                           'fb_url', 'insta_url','tiktok_url', 'linkedin_url', 'website_url']
            worker_data = {key: json_data[key] for key in worker_keys if key in json_data}

            if not storage.get(City, user_data.get('city_id', None)):
                return make_response(jsonify({"error": "city not found"}), 400)
            if len(user_data.get('first_name')) > 20 or len(user_data.get('first_name')) < 3:
                return make_response(jsonify({"error": "Input first_name must be between 3 and 20 characters"}), 400)
            if len(user_data.get('last_name')) > 20 or len(user_data.get('last_name')) < 3:
                return make_response(jsonify({"error": "Input last_name must be between 3 and 20 characters"}), 400)
            phone = user_data.get('phone_number', "")
            if len(phone) > 0:
                Phone = phone.replace(" ", "")
                if not is_valid_phone_number(Phone):
                    return make_response(jsonify({"error": "invalid phone Number most be (+212..) or (06...) or (07..) or (05...)"}), 400)
                if len(Phone) > 16:
                    return make_response(jsonify({"error": "Input phone_number must be less than 16 characters"}), 400)
                user_data['phone_number'] = Phone
            user.first_name = user_data.get("first_name", user.first_name)
            user.last_name = user_data.get("last_name", user.last_name)
            user.phone_number = user_data.get("phone_number", user.phone_number)
            user.is_active = user_data.get("is_active", user.is_active)
            user.city_id = user_data.get("city_id", user.city_id)
            
            if "service_id" not in worker_data:
                return make_response(jsonify({"error": "Missing service_id"}), 400)
            service_id = worker_data["service_id"]
            if not storage.get(Service, service_id):
                return make_response(jsonify({"error": "Service not found"}), 404)
            worker_data['user_id'] = user_id
            instance = Worker(**worker_data)
            instance.save()
            user.save()
            return make_response(jsonify({"message": "Profile Updated Successfully"}), 200)


        #update in case worker become a client
        if json_data['type'] == 'client' and currenttype == 'worker':
            user_keys = ['first_name', 'last_name', 'city_id', 'profile_img', 'phone_number', 'is_active']
            user_data = {key: json_data[key] for key in user_keys if key in json_data}

            if not storage.get(City, user_data['city_id']):
                return make_response(jsonify({"error": "city not found"}), 400)
            if len(user_data.get('first_name')) > 20 or len(user_data.get('first_name')) < 3:
                return make_response(jsonify({"error": "Input first_name must be between 3 and 20 characters"}), 400)
            if len(user_data.get('last_name')) > 20 or len(user_data.get('last_name')) < 3:
                return make_response(jsonify({"error": "Input last_name must be between 3 and 20 characters"}), 400)
            phone = user_data.get('phone_number', "")
            if len(phone) > 0:
                Phone = phone.replace(" ", "")
                if not is_valid_phone_number(Phone):
                    return make_response(jsonify({"error": "invalid phone Number most be (+212..) or (06...) or (07..) or (05...)"}), 400)
                if len(Phone) > 16:
                    return make_response(jsonify({"error": "Input phone_number must be less than 16 characters"}), 400)
                user_data['phone_number'] = Phone
            user.first_name = user_data.get("first_name", user.first_name)
            user.last_name = user_data.get("last_name", user.last_name)
            user.phone_number = user_data.get("phone_number", user.phone_number)
            user.is_active = user_data.get("is_active", user.is_active)
            user.city_id = user_data.get("city_id", user.city_id)
            user.save()
            worker = user.worker
            for project in worker.projects:
                for image in project.images:
                    img_url = image.url
                    full_path =  f"{os.getcwd()}{img_url}"
                    os.remove(full_path)
                    storage.delete(image)
                storage.delete(project)
            for review in worker.reviews:
                storage.delete(review)
            storage.delete(worker)
            storage.save()
            return make_response(jsonify({"message": "Profile Updated Successfully, You are no longer designated as a worker."}), 200)
    else:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
