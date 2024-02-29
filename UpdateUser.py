from flask_jwt_extended import jwt_required, get_jwt_identity

@app_views.route("/users/<user_id>", strict_slashes=False, methods=["PUT"])
@jwt_required()
def update_user(user_id):
    """update user"""
    current_user_id = get_jwt_identity()

    # Check if the user making the request is the same as the user_id in the route
    if current_user_id != user_id:
        return make_response(jsonify({"error": "Unauthorized"}), 401)

    obj = storage.get(User, user_id)
    if obj is None:
        return make_response(jsonify({"error": "User Not found"}), 404)

    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response("Not a JSON", 400)

    # Your existing validation code goes here...

    # Update user information only if the current user is the owner of the profile
    obj.password = data.get("password", obj.password)
    obj.first_name = data.get("first_name", obj.first_name)
    obj.last_name = data.get("last_name", obj.last_name)
    obj.phone_number = data.get("phone_number", obj.phone_number)
    obj.is_active = data.get("is_active", obj.is_active)
    obj.city_id = data.get("city_id", obj.city_id)
    obj.save()

    return jsonify(obj.to_dict()), 200









from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)

# Set up Flask JWT Extended
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)  # Set the initial expiration time

jwt = JWTManager(app)

# Example route that requires a valid access token
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()

    # Extend the expiration time on each request
    new_token = create_access_token(identity=current_user)
    return jsonify(logged_in_as=current_user, new_access_token=new_token), 200

# Example route to get an access token
@app.route('/get_token', methods=['POST'])
def get_token():
    # Create an access token with the identity of the user and return it
    access_token = create_access_token(identity='example_user')
    return jsonify(access_token=access_token), 200

if __name__ == '__main__':
    app.run(debug=True)










from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity

app = Flask(__name__)

# Set up Flask JWT Extended
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)  # Set the expiration time for access token
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)  # Set the expiration time for refresh token

jwt = JWTManager(app)

# Example route that requires a valid access token
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# Example route to get an access token and a refresh token
@app.route('/get_tokens', methods=['POST'])
def get_tokens():
    # Create an access token with the identity of the user and return it along with a refresh token
    access_token = create_access_token(identity='example_user')
    refresh_token = create_refresh_token(identity='example_user')
    return jsonify(access_token=access_token, refresh_token=refresh_token), 200

# Example route to refresh the access token using a refresh token
@app.route('/refresh_token', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_access_token), 200

if __name__ == '__main__':
    app.run(debug=True)
