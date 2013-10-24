!#/bin/sh
echo 'starting app'
cd /server/cortext-projects/
meteor

echo 'starting api'
cd /server/cortext-projects/private/api
node index.js
