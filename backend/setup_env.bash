#!/usr/bin/bash
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db"
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3 -m api.v1.app
find . -type d -name '__pycache__' -exec rm -r {} +