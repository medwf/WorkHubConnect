#!/usr/bin/python3
from flask import request, make_response, jsonify
from models.tokenblocklist import TokenBlockList
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, get_jwt
from datetime import timedelta, datetime, timezone
import time
from models.user import User
from models.service import Service
from models.city import City
from models.worker import Worker
from utils.send_email import SendMail
from hashlib import md5
from models import storage
from api.v1.views import app_views
import re, os


jwt = JWTManager()
phone_regex = r'^(\+212|0)([5-7]\d{8}|[6-7]\d{8})$'
def is_valid_phone_number(phone):
    return re.match(phone_regex, phone) is not None


@app_views.route('/login', methods=["POST"])
def create_token():
    """check email and password, then generate a new token"""
    data = request.get_json()
    if data:
        email = data.get("email", None)
        password = data.get("password", None)
        #Email cannot be empty. Please enter and try again.
        if not email or len(email) == 0:
            return make_response(jsonify({"error": "Email field cannot be empty. Please enter your email and try again."}), 401)
        #Password can't be empty. Enter and try again.
        if not password or len(password) == 0:
            return make_response(jsonify({"error": "Password field cannot be empty. Please enter your password and try again."}), 401)
        if email and password:
            PASSWORD = md5(password.encode()).hexdigest()
            user = storage.GetUserEmail(User, email=email, password=PASSWORD)
            if user is None:
                print("bad email or password")
                return make_response(jsonify({"error": "Invalid email or password"}), 401)
            generate_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
            createtime = datetime.utcnow()
            expiretime = createtime + timedelta(hours=1)
            print(createtime)
            print(expiretime)
            print("login success", generate_token)
            response_data = {
            "token": generate_token,
            "user_id": user.id,
            "message": "You are successfully logged in"
            }
            # Create a response with JSON data
            cookie_expire = datetime.now()
            cookie_expire = cookie_expire + timedelta(hours=1)
            response = make_response(jsonify(response_data))
            timestamp = time.time()
            current_datetime = datetime.fromtimestamp(timestamp)
            exptimestamp = current_datetime + timedelta(hours=1)
            exptimecookie = exptimestamp.timestamp()
            # response.set_cookie('token', value = generate_token, expires = cookie_expire, httponly=True,secure=True, samesite='None',domain = None)
            # response.set_cookie('user_id', value = str(user.id), expires = cookie_expire, httponly=True, secure=True,samesite='None',domain = None)
            # response.set_cookie('expToken', value = str(expiretime), expires = cookie_expire, httponly=True,secure=True, samesite='None',domain = None)
            response.headers.clear()
            response.headers['tokennn'] = generate_token
            response.set_cookie('token', value = generate_token, expires = cookie_expire, samesite='None',max_age = 600)
            response.set_cookie('user_id', value = str(user.id), expires = cookie_expire, samesite='None',max_age = 600)
            response.set_cookie('dateToken', value = str(timestamp), expires = cookie_expire, samesite='None',max_age = 600)
            response.set_cookie('expToken', value = str(exptimecookie), expires = cookie_expire, samesite='None',max_age = 600)
            #response.delete_cookie('')
            #response.set_cookie("key", value = '', max_age = None, expires = None, path = '/', domain = None,secure = None, httponly = False)
            # Set cookies for token and user_id
            print("header : ", response.headers)
            return response
            return make_response(jsonify({"token": generate_token, "user_id": user.id, "message": "You are successfully logged in"}))
    else:
        return jsonify({"error": "Not json"}), 400


@app_views.route("/logout", methods=["DELETE"])
@jwt_required()
def modify_token():
    jti = get_jwt()["jti"]
    instance = TokenBlockList(jti=jti)
    instance.save()
    return make_response(jsonify({"message": "logout successfully"}), 200)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    tokens = storage.all(TokenBlockList).values()
    if jti not in tokens.to_dict():
        return False
    return True


@app_views.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = storage.get(User, current_user_id)
    if not user:
        return make_response(jsonify({"error": "user not found"}), 400)
    return make_response(jsonify({"id": user.id, "email": user.email}), 200)


def create_token_register(userID, email=None, password=None):
    """check email and password, then generate a new token"""
    #Email cannot be empty. Please enter and try again.
    if not email or len(email) == 0:
        return make_response(jsonify({"error": "Oops! Something went wrong. Please try again later."}), 401)
    #Password can't be empty. Enter and try again.
    if not password or len(password) == 0:
        return make_response(jsonify({"error": "Oops! Something went wrong. Please try again later."}), 401)
    if email and password:
        print(email)
        print(password)
        print(userID)
        PASSWORD = md5(password.encode()).hexdigest()
        user = storage.GetUserEmail(User, email=email, password=PASSWORD)
        if user is None or user.id != userID:
            print("bad email or password")
            return make_response(jsonify({"error": "Oops! Something went wrong. Please try again later."}), 401)
        generate_token = create_access_token(identity=user.id)
        print("Account created successfully! You are now logged in.", generate_token)
        response_data = {
        "token": generate_token,
        "user_id": user.id,
        "message": "Account created successfully! You are now logged in."
        }
        # Create a response with JSON data
        response = make_response(jsonify(response_data))
        # Set cookies for token and user_id
        # response.set_cookie('token', generate_token)
        # response.set_cookie('user_id', str(user.id))
        print(response_data)
        print("-------------")
        print(response.data)
        return response
        # return make_response(jsonify({"token": generate_token, "user_id": user.id, "message": "Account created successfully! You are now logged in."}))

#"Account created successfully! You are now logged in."
#"Welcome! Your account has been created, and you are now logged in."
#"Success! You've successfully created your account and are now logged in."

# first we need to send email to client or worker:
@app_views.route("/forgot-password", methods=["POST"])
# @jwt_required()
def ForgotPassword():
    """reset password"""
    # data we need email: check email
    data = request.get_json()
    if not data:
        return make_response(jsonify({"error": "Bad Request, Not a json"}), 400)
    email = data.get('email', None)
    print(email)
    user = storage.ValidEmail(User, email)
    print(user)
    if not user:
        return make_response(jsonify({"error": "No account found with the provided email"}), 404)
    # token ? check token
    expires_delta = timedelta(minutes=30)
    generate_token = create_access_token(identity=user.id, expires_delta=expires_delta)
    MakeUrl = f"http://localhost:3000/auth/reset-password?token={generate_token}"
    # send email using path /reset-password/token
    subject = "Reset Your WorkHubConnect Password"
    Text = f"""Dear [{user.first_name}],

We've received a request to reset your password for your WorkHubConnect account. To proceed with resetting your password, please click the link below:

{MakeUrl}

This link is valid for 30 minutes. If you are late, you will need to repeat the process from the beginning.

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

Best Regards,
The WorkHubConnect Team
Support: workhubconnect.2024@gmail.com
"""
    SendMail(email, subject, Text)
    response_data = {
    "token": generate_token,
    "user_id": user.id,
    "message": "email sended"
    }
    response = make_response(jsonify(response_data))
    return response

@jwt.expired_token_loader
def expired_token_callback(expired_token):
    print("Token has expired")
    return jsonify({"message": "Token has expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(invalid_token):
    print("Invalid Token")
    return jsonify({"message": "Invalid token"}), 401


@app_views.route('/reset-password', methods=['POST'])
@jwt_required()
def ResetPassword():
    """accept url token generat new token"""
    data = request.get_json()
    if data:
        NewPassword = data.get('new_password')
        ConfirmPassword = data.get('confirm_password')
        if NewPassword and ConfirmPassword:
            if NewPassword == ConfirmPassword:
                current_user_id = get_jwt_identity()
                user = storage.get(User, current_user_id)
                if user:
                    if len(NewPassword) > 80:
                        return make_response(jsonify({"error": "Input password must be less than 80 characters"}), 400)
                    if len(NewPassword) < 6:
                        return make_response(jsonify({"error": "Password very weak. It should be at least 6 characters long."}), 400)
                    print(NewPassword)
                    user.password = NewPassword
                    print(user.password)
                    user.save()
                    token = request.headers.get('Authorization')
                    token = token.split(' ')[1]
                    return make_response(jsonify({
                    "token": token,
                    "user_id": user.id,
                    "message": "Password reset successfully."
                    }))
                return make_response(jsonify({"error": "User not found"}), 400)
            return make_response(jsonify({"error": "Password and confirm password do not match"}), 400)
        return make_response(jsonify({"error": "Both New password and Confirm New password are required"}), 400)
    return make_response(jsonify({"error": "Bad Request, Not a json"}), 400)

def MailUpdatePassword(first_name, email):
    body = f"""Dear {first_name},

This is to inform you that your password has been successfully changed.

If you did not make this change or if you have any concerns about the security of your account,
please contact our support team immediately at workhubconnect.2024@gmail.com.

Thank you for choosing our service.

Best regards,
The WorkHubConnect Team
"""
    SendMail(email, "Password Change Successful", body)


@app_views.route('/update_password', methods=['PUT'])
@jwt_required()
def UpdatePassword():
    """update password for user"""
    data = request.get_json()
    if not data:
        return make_response(jsonify({"error": "Bad Request, Not a json"}), 400)
    password = data.get("password", None)
    if password is None:
        return make_response(jsonify({"error": "you have to enter old password"}), 400)
    new_password = data.get("new_password", None)
    if new_password is None:
        return make_response(jsonify({"error": "you have to enter new password"}), 400)
    confirm_password = data.get("confirm_password", None)
    if confirm_password is None:
        return make_response(jsonify({"error": "you have to enter confirm password"}), 400)
    user_id = get_jwt_identity()
    user = storage.get(User, user_id)
    if user is None:
        return make_response(jsonify({"error": "User not found"}), 400)
    password = md5(password.encode()).hexdigest()
    if user.password == password:
        if new_password == confirm_password:
            if len(new_password) < 6:
                return make_response(jsonify({"error": "Password very weak. It should be at least 6 characters long."}), 400)
            if len(new_password) > 16:
                return make_response(jsonify({"error": "Input password must be less than 16 characters"}), 400)
            if user.password == md5(new_password.encode()).hexdigest():
                return make_response(jsonify({"error": "Old password and new password must be different"}))
            user.password = new_password
            user.save()
            MailUpdatePassword(user.first_name, user.email)
            return make_response(jsonify({"message": "password updated successfully"}))
        return make_response(jsonify({"error": "The new password and confirm password not match."}))
    return make_response(jsonify({"error": "The old password is incorrect. Please try again."}))


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
            return make_response(jsonify({"message": "Profile Updated Successfully"}), 200)


        #update in case client become a worker
        if json_data['type'] == 'worker' and currenttype == 'client':
            user_keys = ['first_name', 'last_name', 'city_id', 'profile_img', 'phone_number', 'is_active']
            user_data = {key: json_data[key] for key in user_keys if key in json_data}
            worker_keys = ['user_id', 'service_id', 'city_id', 'description', 'diplome', 'certifications',
                           'fb_url', 'insta_url','tiktok_url', 'linkedin_url', 'website_url']
            worker_data = {key: json_data[key] for key in worker_keys if key in json_data}

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
                    full_path =  f"{os.getcwd()}/projects/{img_url}"
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
