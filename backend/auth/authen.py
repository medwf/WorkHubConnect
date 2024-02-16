#!/usr/bin/python3
from flask import Flask, request, make_response, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models.user import User
from hashlib import md5
from models import storage

app = Flask(__name__)

app.config["SECRET_KEY"] = "Bla-Bla"
jwt = JWTManager(app)

@app.route('/token', methods=["POST"])
def create_token():
    """generate new token base on User"""
    data = request.get_json()
    if data:
        email = data.get("email", None)
        password = data.get("password", None)
        if email and password:
            PASSWORD = md5(password.encode()).hexdigest()
            user = storage.GetUserEmail(User, email=email, password=PASSWORD)
            if user is None:
                return make_response(jsonify({"error": "bad user or password"}), 401)
            generate_token = create_access_token(identity=user.id)
            return make_response(jsonify({"token": generate_token, "user_id": user.id}))
    return "not json", 400

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = storage.get(User, current_user_id)
    if not user:
        return make_response(jsonify({"error": "user not flound"}), 400)
    return make_response(jsonify({"id": user.id, "email": user.email}), 200)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
