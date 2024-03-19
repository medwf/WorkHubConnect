#!/usr/bin/python3
""" class Service"""


from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Service(BaseModel, Base):
    """Representation of a Service """
    __tablename__ = 'services'
    id = Column(Integer, primary_key=True, autoincrement=True)
    en_name = Column(String(128), nullable=False, unique=True)
    ar_name = Column(String(128), nullable=False, unique=True)
    image = Column(String(128), nullable=False)
    description = Column(String(255), nullable=False, unique=True)
    workers = relationship("Worker", backref="service", cascade="all, delete, delete-orphan, save-update")

    def __init__(self, *args, **kwargs):
        """initializes Service"""
        super().__init__(*args, **kwargs)
