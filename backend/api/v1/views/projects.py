#!/usr/bin/python3
"""State objects that handles all default RESTFul API"""

from flask import jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.project import Project


@app_views.route("/projects/<project_id>",
                 strict_slashes=False,
                 methods=["GET"])
@app_views.route("/projects", strict_slashes=False, methods=["GET"])
def projects(project_id=None):
    """return a JSON: list of all Project objects or one Project,
    Or not found if id not exsit"""
    if project_id is None:
        result = []
        projects = storage.all(Project).values()
        for project in projects:
            result.append(project.to_dict())
        return jsonify(result)
    else:
        project = storage.get(Project, project_id)
        if project is None:
            return make_response(jsonify({"error": "Not found"}), 404)
        return jsonify(project.to_dict())


@app_views.route("/projects/<project_id>",
                 strict_slashes=False,
                 methods=["DELETE"])
def Delete_project(project_id):
    """return a JSON: delete a project object that match <project_id>
    or Not found if id not exist"""
    project = storage.get(Project, project_id)
    if project is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    storage.delete(project)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/projects", strict_slashes=False, methods=["POST"])
def Create_project():
    """
    Create Project :
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    If the dictionary doesn't contain the key name,
        raise a 400 error with the message Missing name
    Returns: the new Amenity with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if "name" in json_data:
            instance = Project(**json_data)
            instance.save()
            return make_response(jsonify(instance.to_dict()), 201)
        else:
            return make_response("Missing name", 400)
    else:
        return make_response("Not a JSON", 400)


@app_views.route("/projects/<project_id>", strict_slashes=False,
                 methods=["PUT"])
def update_amenity(amenity_id):
    """update amenity"""
    obj = storage.get(Project, amenity_id)
    if obj is None:
        return make_response(jsonify({"error": "Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response("Not a JSON", 400)
    obj.name = data.get("name", obj.name)
    obj.save()
    return jsonify(obj.to_dict()), 200
