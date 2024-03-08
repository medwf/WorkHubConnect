#!/usr/bin/python3
"""Main module for the Flask web application."""
import os

from flask import Flask, jsonify
from flask_cors import CORS
from api.v1.views import app_views
from models import storage
from datetime import timedelta
from flasgger import Swagger
from models.tokenblocklist import TokenBlockList
from flask_jwt_extended import JWTManager


# Create a Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["SECRET_KEY"] = "62c6924a-9e6a-4d09-abcf-a2695fe420da"
app.config["JWT_SECRET_KEY"] = "ea60ec9f-7a87-4ae9-b326-ffcd558507e1"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']
jwt = JWTManager(app)

# Register the blueprint for API routes
app.register_blueprint(app_views, url_prefix="/api/v1")


@app.teardown_appcontext
def close(CXT):
    """Close the database session after each request."""
    storage.close()


@app.errorhandler(404)
def not_found(EXP):
    """Handle 404 errors by returning a JSON response."""
    return {"error": "Not found"}, 404

app.config['SWAGGER'] = {
    'title': 'WorkHubConnect Restful API',
    'uiversion': 3
}
swagger_config = Swagger.DEFAULT_CONFIG
swagger_config['swagger_ui_bundle_js'] = '//unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js'
swagger_config['swagger_ui_standalone_preset_js'] = '//unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js'
swagger_config['jquery_js'] = '//unpkg.com/jquery@2.2.4/dist/jquery.min.js'
swagger_config['swagger_ui_css'] = '//unpkg.com/swagger-ui-dist@3/swagger-ui.css'
Swagger(app, config=swagger_config)


@jwt.expired_token_loader
def expired_token_callback(expired_token):
    print("Token has expired")
    return jsonify({"message": "Token has expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(invalid_token):
    print("Invalid Token")
    return jsonify({"message": "Invalid token"}), 401

@jwt.revoked_token_loader
def revoked_token_response(jwt_header, jwt_payload):
    return jsonify({'message': 'Token has been revoked'}), 401

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    tokens = storage.all(TokenBlockList).values()
    for token in tokens:
        if jti == token.to_dict()['jti']:
            return True
    return False


if __name__ == "__main__":
    HOST = os.getenv('WORKHUB_API_HOST', "0.0.0.0")
    PORT = int(os.getenv('WORKHUB_API_PORT', 5000))
    app.run(debug=True, host=HOST, port=PORT, threaded=True)
