#!/usr/bin/python3
""" class User"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer, DateTime

class TokenBlockList(BaseModel, Base):
    __tablename__ = "tokenblocklist"
    id = Column(Integer, primary_key=True)
    jti = Column(String(36), nullable=False, index=True)

    def __init__(self, *args, **kwargs):
        """initializes user"""
        super().__init__(*args, **kwargs)
