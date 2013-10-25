#!/bin/sh
#echo 'starting app'
meteor &

#echo 'starting api'
node /server/private/api/index.js &
