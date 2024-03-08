#!/usr/bin/python3
"""This is index views, route of blueprint"""
from flask import jsonify, make_response
from api.v1.views import app_views
from models import storage
from models.city import City
from models.review import Review
from models.state import State
from models.user import User
from models.project import Project
from models.worker import Worker
from models.service import Service
from models.review import Review
from models.image import Image
from models.project import Project


@app_views.route("/status", strict_slashes=False, methods=["GET"])
def status():
    """return status ok, 200"""
    response_data = {
    "app_name": "WorkHubConnect",
    "version": "1.0",
    "description": "WorkHubConnect Reset Full API",
    "year_founded": 2024,
    "country":"Morocco",
    "status": "OK",
    }
    return  make_response (jsonify(response_data), 200)


@app_views.route("/stats", strict_slashes=False, methods=["GET"])
def stats():
    """return json list count all tables"""
    users = storage.count(User)
    workers = storage.count(Worker)
    projects = storage.count(Project)
    cities = storage.count(City)
    reviews = storage.count(Review)
    states = storage.count(State)
    images = storage.count(Image)
    services = storage.count(Service)
    return make_response (jsonify({
        "users": users,
        "workers": workers,
        "projects": projects,
        "services": services,
        "images": images,
        "reviews": reviews,
        "states": states,
        "cities": cities
    }), 200)
