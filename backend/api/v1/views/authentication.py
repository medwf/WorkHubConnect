#!/usr/bin/python3
from flask import request, make_response, jsonify
from models.tokenblocklist import TokenBlockList
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager, get_jwt
from datetime import timedelta, datetime, timezone
# import time
from models.user import User
# from models.service import Service
# from models.city import City
# from models.worker import Worker
from utils.send_email import SendMail
from hashlib import md5
from models import storage
from api.v1.views import app_views
import re


jwt = JWTManager()
phone_regex = r'^(\+212|0)([5-7]\d{8}|[6-7]\d{8})$'
def is_valid_phone_number(phone):
    return re.match(phone_regex, phone) is not None


@app_views.route('/login', methods=["POST"])
def create_token():
    """check email and password, then generate a new token"""
    data = request.get_json(force=True, silent=True)
    if data:
        email = data.get("email", None)
        password = data.get("password", None)
        if not email or len(email) == 0:
            return make_response(jsonify({"error": "Email field cannot be empty. Please enter your email."}), 400)
        if not password or len(password) == 0:
            return make_response(jsonify({"error": "Password field cannot be empty. Please enter your password."}), 400)
        if email and password:
            PASSWORD = md5(password.encode()).hexdigest()
            user = storage.GetUserEmail(User, email=email, password=PASSWORD)
            if user is None:
                return make_response(jsonify({"error": "Invalid email or password"}), 401)
            access_token = create_access_token(identity=user.id, expires_delta=timedelta(hours=1))
            response_data = {
            "token": access_token,
            "user_id": user.id,
            "message": "You are successfully logged in"
            }
            response = make_response(jsonify(response_data))
            return response
    else:
        return jsonify({'error': 'Not a JSON'}), 400


def create_token_register(userID, email=None, password=None):
    """check email and password, then generate an access token"""
    if not email or len(email) == 0:
        return make_response(jsonify({"error": "Oops! Something went wrong. Please try again later."}), 401)
    if not password or len(password) == 0:
        return make_response(jsonify({"error": "Oops! Something went wrong. Please try again later."}), 401)
    if email and password:
        PASSWORD = md5(password.encode()).hexdigest()
        user = storage.GetUserEmail(User, email=email, password=PASSWORD)
        if user is None or user.id != userID:
            return make_response(jsonify({"error": "Oops! Something went wrong. Please try again later."}), 401)
        access_token = create_access_token(identity=user.id)
        response_data = {
        "token": access_token,
        "user_id": user.id,
        "message": "Account created successfully! You are now logged in."
        }
        response = make_response(jsonify(response_data), 200)
        return response


# first we need to send email to client or worker:
@app_views.route("/forgot-password", methods=["POST"])
def ForgotPassword():
    """reset password"""
    # data we need email: check email
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response(jsonify({"error": "Bad Request, Not a json"}), 400)
    email = data.get('email', None)
    user = storage.ValidEmail(User, email)
    if not user:
        return make_response(jsonify({"error": "No account found with the provided email"}), 404)
    # token ? check token
    expires_delta = timedelta(minutes=30)
    reset_pass_token = create_access_token(identity=user.id, expires_delta=expires_delta)
    MakeUrl = f"https://work-hub-connect.vercel.app/auth/reset-password?token={reset_pass_token}"
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
    state = SendMail(email, subject, Text)
    if state.status_code == 200:
        response_data = {
        "token": reset_pass_token,
        "user_id": user.id,
        "message": "Password reset instructions sent successfully"
        }
        response = make_response(jsonify(response_data), 200)
        return response
    else:
        return jsonify({"error": "Failed to send password reset instructions"}), 500



@app_views.route('/reset-password', methods=['POST'])
@jwt_required()
def ResetPassword():
    """accept url token generat new token"""
    data = request.get_json(force=True, silent=True)
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
                    user.password = NewPassword
                    user.save()
                    token = request.headers.get('Authorization')
                    token = token.split(' ')[1]
                    return make_response(jsonify({
                    "token": token,
                    "user_id": user.id,
                    "message": "Password reset successfully."
                    }))
                return make_response(jsonify({"error": "User not found"}), 404)
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
    data = request.get_json(force=True, silent=True)
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



@app_views.route("/logout", methods=["DELETE"])
@jwt_required()
def modify_token():
    """logout users"""
    jti = get_jwt()["jti"]
    instance = TokenBlockList(jti=jti)
    instance.save()
    return make_response(jsonify({"message": "logout successfully"}), 200)
