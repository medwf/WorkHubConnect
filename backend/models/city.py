#!/usr/bin/python3
""" holds class City"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class City(BaseModel, Base):
    """Representation of city """
    __tablename__ = 'cities'
    id = Column(Integer, primary_key=True, autoincrement=True)
    state_id = Column(Integer, ForeignKey('states.id'), nullable=False)
    name = Column(String(128), nullable=False)
    workers = relationship("Worker", backref=("city"), cascade="all, delete, save-update, delete-orphan")
    users = relationship("User", backref=("city"), cascade="all, delete, save-update, delete-orphan")


    def __init__(self, *args, **kwargs):
        """initializes city"""
        super().__init__(*args, **kwargs)