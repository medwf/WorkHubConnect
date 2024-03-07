#!/usr/bin/python3
from flask import request, make_response, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from datetime import timedelta, datetime
import time
from models.user import User
from utils.send_email import SendMail
from hashlib import md5
from models import storage
from api.v1.views import app_views


jwt = JWTManager()

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
