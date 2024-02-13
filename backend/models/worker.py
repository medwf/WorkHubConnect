#!/usr/bin/python3
""" class User"""

import models
from models.base_model import BaseModel, Base
from models.user import User
import sqlalchemy
from sqlalchemy import Column, String, Integer, UniqueConstraint, ForeignKey
from sqlalchemy.orm import relationship
from hashlib import md5

class Worker(BaseModel, Base):
    """Representation of a worker """
    __tablename__ = 'workers'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, onupdate="CASCADE")
    service_id = Column(Integer, ForeignKey('services.id'), nullable=False)
    city_id = Column(Integer, ForeignKey('cities.id'), nullable=False)
    description = Column(String(255), nullable=True)
    diplome = Column(String(100), nullable=True)
    certifications = Column(String(255), nullable=True)
    fb_url = Column(String(100), nullable=True)
    insta_url = Column(String(100), nullable=True)
    tiktok_url = Column(String(100), nullable=True)
    linkedin_url = Column(String(100), nullable=True)
    website_url = Column(String(100), nullable=True)
    reviews = relationship("Review", backref="worker", cascade="all, delete, delete-orphan, save-update")
    projects = relationship("Project", backref="worker", cascade="all, delete, delete-orphan, save-update")
    

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)