#!/usr/bin/python3
""" Test link Many-To-Many Place <> Amenity
"""
from models import *
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
states = storage.all(State).values()
for state in states:
	print(state.name)
	for city in state.cities:
		print(f"\tcity in {state.name}  {city.name}")
  
  
