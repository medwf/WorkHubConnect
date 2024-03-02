#!/usr/bin/env bash
./.kill.sh
# run api backend
cd backend
echo "running api .. "
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3 -m api.v1.app > /dev/null 2>&1 &
# in server: 
# WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="WHC_123_2024" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" python3 -m api.v1.app > /dev/null 2>&1 &

cd ..
sleep 3;
echo "api is running successfully ..."

# run frontend
cd frontend
echo "running frontend .. "
npm run dev > /dev/null 2>&1 &
cd ..
sleep 3;
echo "frontend is running successfully ..."

# if you want to chabge password that use in server.
# ALTER USER 'workhub_user'@'localhost' IDENTIFIED BY 'WHC_123_2024';
