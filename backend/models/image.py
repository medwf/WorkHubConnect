#!/usr/bin/python3

import models
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, Integer, UniqueConstraint, ForeignKey
from sqlalchemy.orm import relationship


class Image(BaseModel, Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String(100), unique=True)
    project_id = Column(Integer, ForeignKey('projects.id'))

    def __init__(self, *args, **kwargs):
        """initializes Image"""
        super().__init__(*args, **kwargs)