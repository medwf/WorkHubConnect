#!/usr/bin/python3
"""import module"""
from flask import jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.worker import Worker
from models.user import User
from models.review import Review
from flasgger.utils import swag_from


@app_views.route("/workers/<int:worker_id>/reviews", strict_slashes=False, methods=["GET"])
@swag_from('documentation/review/get_reviews.yml', methods=['GET'])
def reviews(worker_id):
    """Retrieves the list of all workers objects of a City
    Retrieves a Place object.
    """
    worker = storage.get(Worker, worker_id)
    if worker:
        result = []
        reviews = worker.reviews
        for review in reviews:
            result.append(review.to_dict())
        return jsonify(result), 200
    return make_response(jsonify({"error": "worker Not found"}), 404)


@app_views.route("/reviews/<int:review_id>", strict_slashes=False, methods=["GET"])
@swag_from('documentation/review/get_review.yml', methods=['GET'])
def review(review_id):
    """Retrieves the list of all reviews objects of a City
    Retrieves a Place object.
    """
    review = storage.get(Review, review_id)
    if review:
        return jsonify(review.to_dict()), 200
    return make_response(jsonify({"error": "review Not found"}), 404)


@app_views.route("/reviews/<int:review_id>", strict_slashes=False, methods=["DELETE"])
@swag_from('documentation/review/delete_review.yml', methods=['DELETE'])
def delete_review(review_id):
    """return a JSON: delete a review object that match review_id
    or Not found if the id not match any exist review"""
    review = storage.get(Review, review_id)
    if review is None:
        return make_response(jsonify({"error": "review Not found"}), 404)
    storage.delete(review)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route("/workers/<int:worker_id>/reviews", strict_slashes=False, methods=["POST"])
@swag_from('documentation/review/post_review.yml', methods=['POST'])
def create_review(worker_id):
    """
    If the worker_id is not linked to any City object, raise a 404 error
    If the HTTP request body is not valid JSON,
    raise a 400 error with the message Not a JSON
    If the dictionary doesn’t contain the key user_id,
    raise a 400 error with the message Missing user_id
    If the user_id is not linked to any User object,
    raise a 404 error
    If the dictionary doesn’t contain the key name,
    raise a 400 error with the message Missing name
    Returns the new worker with the status code 201
    """
    json_data = request.get_json(force=True, silent=True)
    if json_data:
        if "user_id" not in json_data:
            return make_response(jsonify({"error": "Missing user_id"}), 400)
        worker = storage.get(Worker, worker_id)
        if worker is None:
            return make_response(jsonify({"error": "worker not found"}), 404)
        user_id = json_data["user_id"]
        if not storage.get(User, user_id):
            return make_response(jsonify({"error": "User not found"}), 404)

        if "text" not in json_data:
            return make_response(jsonify({"error": "Missing text"}), 400)
        if "note" not in json_data:
            return make_response(jsonify({"error": "Missing note"}), 400)
        json_data['worker_id'] = worker_id
        if worker.user_id == json_data['user_id']:
            return make_response(jsonify({"error": "can't review yourself"}))
        instance = Review(**json_data)
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    return make_response(jsonify({"error": "Not a JSON"}), 400)


@app_views.route("/reviews/<int:review_id>", strict_slashes=False, methods=["PUT"])
@swag_from('documentation/review/put_review.yml', methods=['PUT'])
def update_review(review_id):
    """update review"""
    review = storage.get(Review, review_id)
    if review is None:
        return make_response(jsonify({"error": "Review Not found"}), 404)
    data = request.get_json(force=True, silent=True)
    if not data:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    review.text = data.get("text", review.text)
    review.note = data.get("note", review.note)
    review.save()
    return jsonify(review.to_dict()), 200
