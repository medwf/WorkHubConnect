#!/usr/bin/python3
"""sharing app_views Blueprint to all module"""

from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")
from api.v1.views.index import *
from api.v1.views.states import *
from api.v1.views.cities import *
from api.v1.views.users import *
from api.v1.views.projects import *
from api.v1.views.workers import *
from api.v1.views.images import *
from api.v1.views.workers_reviews import *
from api.v1.views.authentication import *
from api.v1.views.register import *
from api.v1.views.services import *
