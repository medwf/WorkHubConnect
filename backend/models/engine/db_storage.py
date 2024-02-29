#!/usr/bin/python3
"""
Contains the class DBStorage
"""

import models
from models.base_model import BaseModel, Base
from models.city import City
from models.user import User
from models.state import State
from models.worker import Worker
from models.service import Service
from models.review import Review
from models.image import Image
from models.project import Project
from os import getenv
import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

classes = {"Wroker": Worker, "City": City,
           "Service": Service, "Review": Review, "State": State, "User": User, "Project": Project, "Image": Image}


class DBStorage:
    """interaacts with the MySQL database"""
    __engine = None
    __session = None

    def __init__(self):
        """Instantiate a DBStorage object"""
        WORKHUB_MYSQL_USER = getenv('WORKHUB_MYSQL_USER')
        WORKHUB_MYSQL_PWD = getenv('WORKHUB_MYSQL_PWD')
        WORKHUB_MYSQL_HOST = getenv('WORKHUB_MYSQL_HOST')
        WORKHUB_MYSQL_DB = getenv('WORKHUB_MYSQL_DB')
        WORKHUB_ENV = getenv('WORKHUB_ENV')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}?charset=utf8mb4'.
                                      format(WORKHUB_MYSQL_USER,
                                             WORKHUB_MYSQL_PWD,
                                             WORKHUB_MYSQL_HOST,
                                             WORKHUB_MYSQL_DB))
        if WORKHUB_ENV == "test":
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """query on the current database session"""
        new_dict = {}
        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                objs = self.__session.query(classes[clss]).all()
                for obj in objs:
                    key = f"{obj.__class__.__name__}.{obj.id}"
                    new_dict[key] = obj
        return (new_dict)

    def new(self, obj):
        """add the object to the current database session"""
        self.__session.add(obj)

    def save(self):
        """commit all changes of the current database session"""
        self.__session.commit()

    def delete(self, obj=None):
        """delete from the current database session obj if not None"""
        if obj is not None:
            self.__session.delete(obj)

    def reload(self):
        """reloads data from the database"""
        Base.metadata.create_all(self.__engine)
        sess_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Session = scoped_session(sess_factory)
        self.__session = Session

    def close(self):
        """call remove() method on the private session attribute"""
        self.__session.remove()

    def get(self, cls, id):
        """
        Returns the object based on the class name and its ID, or
        None if not found
        """
        if cls not in classes.values():
            return None

        all_cls = models.storage.all(cls)
        for value in all_cls.values():
            if (int(value.id) == int(id)):
                return value
        return None


    def GetUserEmail(self, cls, email, password):
        """
        Returns the object based on the class name and its email,
        or None if not found
        """
        if cls is not User:
            return None

        users = models.storage.all(cls)
        for user in users.values():
            if email == user.email and password == user.password:
                return user
        return None

    def ValidEmail(self, cls, email):
        """
        Returns the object based on the class name and its email,
        or None if not found
        """
        if cls is not User:
            return None

        users = models.storage.all(cls)
        for user in users.values():
            if email == user.email:
                return user
        return None

    def count(self, cls=None):
        """
        count the number of objects in storage
        """
        all_class = classes.values()

        if not cls:
            count = 0
            for clas in all_class:
                count += len(models.storage.all(clas).values())
        else:
            count = len(models.storage.all(cls).values())

        return count

    def get_with_offset(self, cls=None, offset=1, limit=10):
        """Query on the current database session with pagination"""
        new_dict = {}

        for clss in classes:
            if cls is None or cls is classes[clss] or cls is clss:
                query_offset = (offset - 1) * limit
                objs = (
                    self.__session.query(classes[clss])
                    .order_by(classes[clss].created_at.desc())
                    .offset(query_offset)
                    .limit(limit)
                    .all()
                    )
                for obj in objs:
                    key = f"{obj.__class__.__name__}.{obj.id}"
                    new_dict[key] = obj
        return new_dict
