#!/usr/bin/env bash
# kill process 5000 and 3000

PORTS=(5000 3000)

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
