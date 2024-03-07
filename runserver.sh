#!/usr/bin/bash
cd backend
PORTS=(5000)

for PORT in "${PORTS[@]}"; do
    # Find the processes using the specified port
    PIDS=$(lsof -ti :$PORT)

    # Check if there are any processes using the port
    if [ -n "$PIDS" ]; then
        # Kill the processes
        kill -9 $PIDS
        echo "Processes using port $PORT killed."
    else
        echo "No processes found using port $PORT."
    fi
done
sleep 1
WORKHUB_MYSQL_USER="workhub_user" WORKHUB_MYSQL_PWD="123" WORKHUB_MYSQL_HOST="localhost" WORKHUB_MYSQL_DB="workhubconnect_db" tmux new-session -d 'gunicorn --bind 0.0.0.0:5000 api.v1.app:app'
cd ..
sleep 2;
echo "api is running successfully ..."