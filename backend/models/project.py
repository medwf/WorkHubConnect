#!/usr/bin/python3
""" class Project"""


from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class Project(BaseModel, Base):
    """Representation of a Project """
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True, autoincrement=True)
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=False)
    images = relationship('Image', backref='project')
    title = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=False)

    def __init__(self, *args, **kwargs):
        """initializes Project"""
        super().__init__(*args, **kwargs)
