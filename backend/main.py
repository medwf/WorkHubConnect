#!/usr/bin/python3
""" Test link Many-To-Many Place <> Amenity
"""
from models import storage
from models.city import City
from models.user import User
from models.state import State
from models.worker import Worker
from models.service import Service
from models.review import Review
from models.image import Image
from models.project import Project

# user = storage.get(User, 1)
# print(user.email)
# city = storage.get(City, 1)
# print(city.name)
# users = city.users
# states = storage.all(State).values()
# for state in states:
# 	# print(state.name)
# 	for city in state.cities:
# 		if city.name in ("Marrakech", "Casablanca"):
# 			print(f"City : {city.name}")
# 			for worker in city.workers:
# 				user = storage.get(User, worker.user_id) 
# 				print(f"\tWorker : {worker.description}has email :  {user.email}")
# 				for review in worker.reviews:
# 					print(f"\t\tReview : {review.text}")
# 				for project in worker.projects:
# 					print(f"\t\tProject :  {user.email} : {project.title}")
# 					for image in project.images:
# 						print(f"\t\t\tImage: {image.url}")
users = storage.all(User).values()
for user in users:
    print(user.first_name, user.worker)
    