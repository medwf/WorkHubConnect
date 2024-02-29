#!/usr/bin/python3
"""State objects that handles all default RESTFul API"""

from flask import jsonify, make_response, request, send_file


from api.v1.views import app_views
from models import storage
from models.project import Project
from models.image import Image
import os



@app_views.route("/projects/<int:project_id>/images",
                 strict_slashes=False,
                 methods=["GET"])
@app_views.route("/images/<int:image_id>", strict_slashes=False, methods=["GET"])
def images(project_id=None, image_id=None):
    """return a JSON: list of all image objects or one image,
    Or not found if id not exsit"""
    if project_id:
        result = []
        project = storage.get(Project, project_id)
        if project is None:
            return make_response(jsonify({"error": "project Not found"}), 404)
        for image in project.images:
            result.append(image.to_dict())
        return jsonify(result)
    else:
        image = storage.get(Image, image_id)
        if image is None:
            return make_response(jsonify({"error": "image Not found"}), 404)
        return jsonify(image.to_dict())


@app_views.route("/images/<int:image_id>",
                 strict_slashes=False,
                 methods=["DELETE"])
def Delete_image(image_id):
    """return a JSON: delete a image object that match <image_id>
    or Not found if id not exist"""
    image = storage.get(Image, image_id)
    if image is None:
        return make_response(jsonify({"error": "image Not found"}), 404)
    storage.delete(image)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/projects/<int:project_id>/images", strict_slashes=False, methods=["POST"])
def Create_image(project_id):
    """
    Create image :
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    If the dictionary doesn't contain the key url,
        raise a 400 error with the message Missing url
    Returns: the new worker with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    project = storage.get(Project, project_id)
    if project is None:
        return make_response(jsonify({"error": "project Not found"}), 404)
    if json_data:
        if "url" not in json_data:
            return make_response(jsonify({"error": "Missing url"}), 400)
        if len(json_data['url']) > 100:
            return make_response(jsonify({"error": "Input url must be less than 100 characters"}), 400)
        json_data['project_id'] = project_id
        instance = Image(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    else:
        return make_response(jsonify({"error": "Not a JSON"}), 400)


@app_views.route("/images/<image_id>", strict_slashes=False,
                 methods=["PUT"])
def update_image(image_id):
    """update image"""
    obj = storage.get(Image, image_id)
    if obj is None:
        return make_response(jsonify({"error": "image Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if len(data.get('url', "")) > 100:
            return make_response(jsonify({"error": "Input url must be less than 100 characters"}), 400)
    obj.url = data.get("url", obj.url)
    obj.save()
    return jsonify(obj.to_dict()), 200


@app_views.route('/get_image/<path:image_path>', strict_slashes=False, methods=["GET"])
def get_image(image_path):
    try:
        current_dir = os.getcwd()
        image_path = f"{current_dir}/images/{image_path}"

        return send_file(image_path, mimetype='image/jpg')
    except FileNotFoundError:
        return make_response(jsonify({"message":"Image not found"}), 405)