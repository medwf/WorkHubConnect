#!/usr/bin/python3
"""State objects that handles all default RESTFul API"""

from flask import jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.project import Project
from models.worker import Worker


@app_views.route("/projects/<int:project_id>",
                 strict_slashes=False,
                 methods=["GET"])
@app_views.route("/workers/<int:worker_id>/projects", strict_slashes=False, methods=["GET"])
def projects(project_id=None, worker_id=None):
    """return a JSON: list of all Project objects or one Project,
    Or not found if id not exsit"""
    if worker_id:
        result = []
        worker = storage.get(Worker, worker_id)
        if worker is None:
            return make_response(jsonify({"error": "worker Not found"}), 404)
        for project in worker.projects:
            result.append(project.to_dict())
        return jsonify(result)
    else:
        project = storage.get(Project, project_id)
        if project is None:
            return make_response(jsonify({"error": "project Not found"}), 404)
        return jsonify(project.to_dict())


@app_views.route("/projects/<int:project_id>",
                 strict_slashes=False,
                 methods=["DELETE"])
def Delete_project(project_id):
    """return a JSON: delete a project object that match <project_id>
    or Not found if id not exist"""
    project = storage.get(Project, project_id)
    if project is None:
        return make_response(jsonify({"error": "project Not found"}), 404)
    storage.delete(project)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/workers/<int:worker_id>/projects", strict_slashes=False, methods=["POST"])
def Create_project(worker_id):
    """
    Create Project :
    If the HTTP body request is not valid JSON,
        raise a 400 error with the message Not a JSON
    If the dictionary doesn't contain the key title,
        raise a 400 error with the message Missing title
    If the dictionary doesn't contain the key description,
        raise a 400 error with the message Missing description
    Returns: the new project with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    worker = storage.get(Worker, worker_id)
    if worker is None:
        return make_response(jsonify({"error": "worker Not found"}), 404)
    if json_data:
        if "title" not in json_data:
            return make_response(jsonify({"error": "Missing title"}), 400)
        if len(json_data['title']) > 255:
            return make_response(jsonify({"error": "Input title must be less than 255 characters"}), 400)
        if "description" not in json_data:
            return make_response(jsonify({"error": "Missing description"}), 400)
        if len(json_data['description']) > 1024:
            return make_response(jsonify({"error": "Input description must be less than 1024 characters"}), 400)
        json_data['worker_id'] = worker_id
        instance = Project(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    else:
        return make_response(jsonify({"error": "Not a JSON"}), 400)


@app_views.route("/projects/<project_id>", strict_slashes=False,
                 methods=["PUT"])
def update_project(project_id):
    """update project"""
    obj = storage.get(Project, project_id)
    if obj is None:
        return make_response(jsonify({"error": "project Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if len(data.get('description', "")) > 1024:
            return make_response(jsonify({"error": "Input description must be less than 1024 characters"}), 400)
    if len(data.get('title', "")) > 255:
            return make_response(jsonify({"error": "Input title must be less than 255 characters"}), 400)
    obj.title = data.get("title", obj.title)
    obj.description = data.get("description", obj.description)
    obj.save()
    return jsonify(obj.to_dict()), 200


@app_views.route("/projects/pages/", strict_slashes=False, methods=["GET"])
@app_views.route("/projects/pages", strict_slashes=False, methods=["GET"])
@app_views.route("/projects/pages/<int:page>/<int:limit>", strict_slashes=False, methods=["GET"])
def projects_with_offset(page=None, limit=None):
    """Retrieves a number of projects based on page and limit """
    if not page and not limit:
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=10, type=int)
    projects = storage.get_with_offset(Project, ffset=page, limit=limit).values()
    result = []
    for project in projects:
        result.append(project.to_dict())
    return jsonify(result), 200
