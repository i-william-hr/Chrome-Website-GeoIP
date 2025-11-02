#!/bin/bash
SESSION="geoip"
APP_PATH="/root/geo.py"
PYTHON="/usr/bin/python3"

screen -S "$SESSION" -X quit 2>/dev/null

screen -dmS "$SESSION" bash -c "
    cd $(dirname "$APP_PATH")
    echo '[geoip] starting Flask server...'
    $PYTHON $APP_PATH 2>&1 | tee /var/log/geoip.log
"
echo "Started geo.py in screen session '$SESSION'"
