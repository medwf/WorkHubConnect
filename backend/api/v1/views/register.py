#!/usr/bin/python3
"""Importing modules"""
import hashlib
from flask import jsonify, make_response, request
from api.v1.views import app_views
from models import storage
from models.user import User
from models.service import Service
from models.city import City
from models.worker import Worker
import re
from api.v1.views.users import *
from sendmail.send_email import SendMail

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
feel free to reach out to our support team at [workhubconnect.2024@gmail.com].

Once again, welcome to WorkHubConnect! We look forward to seeing you thrive in our community.
visit Now : https://workhubconnect.com/

Best Regards,
The WorkHubConnect Team
[WorkHubConnect]
[workhubconnect.2024@gmail.com]
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
            return make_response("Invalid request", 400)

        # Case register as worker
        if json_data['type'] == 'worker':
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

            if "service_id" not in json_data:
                return make_response("Missing service_id", 400)

            service_id = json_data["service_id"]
            if not storage.get(Service, service_id):
                return make_response(jsonify({"error": "Service not found"}), 404)
            instance = User(**json_data)
            instance.save()
            user_id = instance.id
            if not storage.get(User, user_id):
                return make_response(jsonify({"error": "User not created"}), 404)
            json_data['user_id'] = user_id
            instance = Worker(**json_data)
            instance.save()
            content = MailBody(json_data['first_name'])
            SendMail(json_data['email'], Subject, content)
            return make_response(jsonify(instance.to_dict()), 201)
        # Case register as client
        if json_data['type'] == "client":
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

