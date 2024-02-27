#!/usr/bin/python3
from flask import request, make_response, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta, datetime
import time
from models.user import User
from utils.send_email import SendMail
from hashlib import md5
from models import storage
from api.v1.views import app_views


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
        response.set_cookie('token', generate_token)
        response.set_cookie('user_id', str(user.id))
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
        return make_response(jsonify({"error": "Not a json"}), 400)
    email = data.get('email', None)
    print(email)
    user = storage.ValideEmail(User, email)
    print(user)
    if not user:
        return make_response(jsonify({"error": "Email not found"}), 400)
    # token ? check token
    generate_token = create_access_token(identity=user.id)
    MakeUrl = f"http://localhost:5500/ALX-repo/WorkHubConnect/TestLogin/reset-password.html?tk={generate_token}"
    # send email using path /reset-password/token
    subject = "Reset Your WorkHubConnect Password"
    Text = f"""Dear [{user.first_name}],

We've received a request to reset your password for your WorkHubConnect account. To proceed with resetting your password, please click the link below:

[{MakeUrl}]

If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.

Thank you,
The WorkHubConnect Team
"""
    print("befor sending email")
    SendMail(email, subject, Text)
    print("after sending email")
    createtime = datetime.utcnow()
    expiretime = createtime + timedelta(hours=1)
    response_data = {
    "token": generate_token,
    "user_id": user.id,
    "message": "email sended"
    }
    # Create a response with JSON data
    cookie_expire = datetime.now()
    cookie_expire = cookie_expire + timedelta(hours=1)
    response = make_response(jsonify(response_data))
    timestamp = time.time()
    current_datetime = datetime.fromtimestamp(timestamp)
    exptimestamp = current_datetime + timedelta(hours=1)
    exptimecookie = exptimestamp.timestamp()
    response.headers.clear()
    response.headers['tokennn'] = generate_token
    response.set_cookie('token', value = generate_token, expires = cookie_expire, samesite='None',max_age = 600)
    response.set_cookie('user_id', value = str(user.id), expires = cookie_expire, samesite='None',max_age = 600)
    response.set_cookie('dateToken', value = str(timestamp), expires = cookie_expire, samesite='None',max_age = 600)
    response.set_cookie('expToken', value = str(exptimecookie), expires = cookie_expire, samesite='None',max_age = 600)
    return response

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
                    "message": "Account updated password successfully."
                    }))
                return make_response(jsonify({"error": "user not found"}))
            return make_response(jsonify({"error": "Passwords do not match."}), 400)
        return make_response(jsonify({"error": "new_password or confirm_password, not define"}), 400)
    return make_response(jsonify({"error": "Not a json"}), 400)
