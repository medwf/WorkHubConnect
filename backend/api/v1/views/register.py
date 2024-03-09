#!/usr/bin/python3
"""Importing modules"""
from flask import jsonify, make_response, request
from api.v1.views import app_views
from models import storage
from models.user import User
from models.service import Service
from models.city import City
from models.worker import Worker
import re
from api.v1.views.users import *
from api.v1.views.authentication import *
from utils.send_email import SendMail

email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
email_regex =  r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'


def is_valid_email(email):
    return re.match(email_regex, email) is not None

phone_regex = r'^(\+212|0)([5-7]\d{8}|[6-7]\d{8})$'

def is_valid_phone_number(phone):
    return re.match(phone_regex, phone) is not None

Subject = "Welcome to WorkHubConnect – Your Professional Network"
def MailBody(first_name):
    content = f"""Dear {first_name},

Welcome to WorkHubConnect! We are thrilled to have you as a new member of our professional network.
Your journey to connecting with like-minded professionals, exploring opportunities, and fostering collaboration starts now.

Here are a few things you can do to get started:

1. Complete Your Profile: Enhance your presence on WorkHubConnect by completing your profile. 
    Add a professional photo, update your bio, and highlight your skills and experiences.
2. Discover Opportunities: Explore job listings, projects, and collaboration opportunities tailored to your skills and interests.
3. Take a Site Tour: Familiarize yourself with WorkHubConnect by taking a quick site tour. Navigate through key features,
    learn how to connect with professionals, and discover the full range of possibilities our platform offers

Remember, WorkHubConnect is all about empowering professionals like you. If you have any questions or need assistance,
feel free to reach out to our support team at workhubconnect.2024@gmail.com.

Once again, welcome to WorkHubConnect! We look forward to seeing you thrive in our community.
visit Now : https://workhubconnect.com/

Best Regards,
The WorkHubConnect Team
"""
    return (content)


@app_views.route("/register", strict_slashes=False, methods=["POST"])
def register_client_worker():
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
        if len(json_data) > 0 and 'type' not in json_data or json_data['type'] not in ("client", "worker"):
            return make_response(jsonify({"error": "Invalid request"}), 400)

        # Case register as worker
        if json_data['type'] == 'worker':
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
                    return make_response(jsonify({"error": "Email already exists"}), 409)
            if 'id' in json_data:
                del json_data['id']

            if "service_id" not in json_data:
                return make_response(jsonify({"error": "Missing service_id"}), 400)

            service_id = json_data["service_id"]
            if not storage.get(Service, service_id):
                return make_response(jsonify({"error": "Service not found"}), 404)
            user_keys = ['email', 'password', 'first_name', 'last_name', 'city_id', 'profile_img', 'phone_number', 'is_active']
            user_data = {key: json_data[key] for key in user_keys if key in json_data}
            instance = User(**user_data)
            instance.save()
            user_id = instance.id
            if not storage.get(User, user_id):
                return make_response(jsonify({"error": "Unable to create your account. Please try again"}), 404)
            json_data['user_id'] = user_id
            worker_keys = ['user_id', 'service_id', 'city_id', 'description', 'diplome', 'certifications',
                           'fb_url', 'insta_url','tiktok_url', 'linkedin_url', 'website_url']
            worker_data = {key: json_data[key] for key in worker_keys if key in json_data}
            instance = Worker(**worker_data)
            instance.save()
            content = MailBody(json_data['first_name'])
            SendMail(json_data['email'], Subject, content)
            res = create_token_register(user_id, json_data['email'], json_data['password'])
            return res, 201
        # Case register as client
        if json_data['type'] == "client":
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

            if "city_id" not in json_data:
                return make_response(jsonify({"error": "Missing city_id"}), 400)
            if not storage.get(City, json_data['city_id']):
                return make_response(jsonify({"error": "city not found"}), 400)
            if len(json_data.get('first_name', "")) > 20:
                return make_response(jsonify({"error": "Input first_name must be less than 20 characters"}), 400)
            if len(json_data.get('last_name', "")) > 20:
                return make_response(jsonify({"error": "Input last_name must be less than 20 characters"}), 400)
            phone = json_data.get('phone_number', "")
            if len(phone) > 0:
                Phone = phone.replace(" ", "")
                if not is_valid_phone_number(Phone):
                    return make_response(jsonify({"error": "invalid phone Number must be (+212..) or (06...) or (07..) or (05...)"}), 400)
                if len(Phone) > 16:
                    return make_response(jsonify({"error": "Input phone_number must be less than 16 characters"}), 400)
                json_data['phone_number'] = Phone
            users = storage.all(User).values()
            for user in users:
                if (user.email == json_data['email']):
                    return make_response(jsonify({"error": "Email already exists"})), 400
            if 'id' in json_data:
                del json_data['id']

            user_keys = ['email', 'password', 'first_name', 'last_name', 'city_id', 'profile_img', 'phone_number', 'is_active']
            user_data = {key: json_data[key] for key in user_keys if key in json_data}
            instance = User(**user_data)
            instance.save()
            content = MailBody(user_data['first_name'])
            SendMail(user_data['email'], Subject, content)
            res = create_token_register(instance.id, user_data['email'], user_data['password'])
            return res, 201
    else:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
