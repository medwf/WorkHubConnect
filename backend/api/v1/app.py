#!/usr/bin/python3
"""Main module for the Flask web application."""
import os

from flask import Flask
from flask_cors import CORS
from api.v1.views import app_views
from models import storage
from datetime import timedelta
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flasgger import Swagger


# Create a Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config["SECRET_KEY"] = "62c6924a-9e6a-4d09-abcf-a2695fe420da"
app.config["JWT_SECRET_KEY"] = "ea60ec9f-7a87-4ae9-b326-ffcd558507e1"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_BLACKLIST_ENABLED'] = True
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

if __name__ == "__main__":
    HOST = os.getenv('WORKHUB_API_HOST', "0.0.0.0")
    PORT = int(os.getenv('WORKHUB_API_PORT', 5000))
    app.run(debug=True, host=HOST, port=PORT, threaded=True)
