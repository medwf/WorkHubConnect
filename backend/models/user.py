#!/usr/bin/python3
""" class User"""

import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Integer, UniqueConstraint, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from hashlib import md5


class User(BaseModel, Base):
    """Representation of a user """
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(64), nullable=False)
    first_name = Column(String(20), nullable=False)
    last_name = Column(String(20), nullable=False)
    city_id = Column(Integer, ForeignKey('cities.id'), nullable=False)
    profile_img = Column(String(128), nullable=True)
    phone_number = Column(String(16), nullable=True)
    is_active = Column(Boolean, unique=False, default=True)
    reviews = relationship("Review", backref="user", cascade="all, delete, save-update")
    worker = relationship("Worker", backref="user", uselist=False,  cascade="all, delete, save-update")

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)
