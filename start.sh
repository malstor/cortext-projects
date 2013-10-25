#!/bin/sh
echo 'starting app'
meteor &

echo 'starting api'
node ./private/api/index.js &
