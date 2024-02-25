#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Reviews """
from models.review import Review
from models.worker import Worker
from models.user import User
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('/workers/<int:worker_id>/reviews', methods=['GET'],
                 strict_slashes=False)
@app_views.route('/reviews/<int:review_id>', methods=['GET'],
                 strict_slashes=False)
def get_reviews(worker_id=None, review_id=None):
    """
    Retrieves the list of all Review objects of a worker
    """
    if worker_id:
        worker = storage.get(Worker, worker_id)
        if worker is None:
            return make_response(jsonify({"error": "worker Not found"}), 404)
        reviews = [review.to_dict() for review in worker.reviews]
        return jsonify(reviews), 200
    else:
        review = storage.get(Review, review_id)
        if review is None:
            return make_response(jsonify({"error": "review Not found"}), 404)
        return jsonify(review.to_dict()), 200


@app_views.route('/reviews/<int:review_id>', methods=['DELETE'],
                 strict_slashes=False)
def delete_review(review_id):
    """
    Deletes a Review Object
    """
    review = storage.get(Review, review_id)
    if not review:
        make_response(jsonify({"error": "review Not found"}), 404)
    storage.delete(review)
    storage.save()
    return make_response(jsonify({}), 200)


@app_views.route('/workers/<int:worker_id>/reviews', methods=['POST'],
                 strict_slashes=False)
def post_review(worker_id):
    """
    Creates a Review
    """
    worker = storage.get(Worker, worker_id)
    if not worker:
        make_response(jsonify({"error": "worker Not found"}), 404)

    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    if 'user_id' not in request.get_json():
        return make_response(jsonify({"error": "Missing user_id"}), 400)

    data = request.get_json()
    user = storage.get(User, data['user_id'])
    if not user:
        make_response(jsonify({"error": "user Not found"}), 404)

    if 'text' not in data:
        return make_response(jsonify({"error": "Missing text"}), 400)
    if len(data['text']) > 1024:
        return make_response(jsonify({"error": "Input text must be less than 1024 characters"}), 400)

    data['worker_id'] = worker_id
    instance = Review(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/reviews/<int:review_id>', methods=['PUT'], strict_slashes=False)
def put_review(review_id):
    """
    Updates a Review
    """
    review = storage.get(Review, review_id)
    if review is None:
        return make_response(jsonify({"error": "review Not found"}), 404)

    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    data = request.get_json()
    if len(data['text']) > 1024:
        return make_response(jsonify({"error": "Input text must be less than 1024 characters"}), 400)
    review.text = data.get("text", review.text)
    storage.save()
    return make_response(jsonify(review.to_dict()), 200)
