#!/usr/bin/python3
from flask import Flask, request, make_response, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from models.user import User
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
                return make_response(jsonify({"error": "Invalid email or password. Please try again"}), 401)
            generate_token = create_access_token(identity=user.id)
            print("login success", generate_token)
            response_data = {
            "token": generate_token,
            "user_id": user.id,
            "message": "You are successfully logged in"
            }
            # Create a response with JSON data
            response = make_response(jsonify(response_data))
            # Set cookies for token and user_id
            response.set_cookie('token', generate_token)
            response.set_cookie('user_id', str(user.id))
            return response
            # return make_response(jsonify({"token": generate_token, "user_id": user.id, "message": "You are successfully logged in"}))
    else:
        return "Not json", 400

@app_views.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = storage.get(User, current_user_id)
    if not user:
        return make_response(jsonify({"error": "user not flound"}), 400)
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

