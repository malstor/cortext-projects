cortext-projects
================
Cortext Projects is the front web app of Cortext plateform (see cortext.net) : it handles collaborative management of projects, documents uploads and job launching.

#Requirements
Cortext-projects uses the following technologies : 
- Meteorjs
- Nodejs
- Docker.io for deployment (experimental)

#Install
- git clone the repo
- install meteor (see docs.meteor.com)
- launch with "meteor"

Alternatively, you can bundle in a nodejs apps with meteor bundle (again, see docs.meteor.com for details). In that case you will need a mongodb server running.

#Configure
The parameters are stored in a env/parameters.js file witch you have to create by copying the parameters.js.cortext file and set your own parameters. 
Note that this front app is very linked to the other modules of Cortext for now and cannot work as a standalone app.

#Tests
The sub-directory test handle the automated test for special api part of the app (private/api).
Tests are done with mocha (http://visionmedia.github.io/mocha) for the tests engine, and supertest(https://github.com/visionmedia/supertest)  to add some http request specific tests. 
After installing mocha, just type "mocha" at the root of the api directory (private/api).thhth

#Troubleshooting
## API not responding
If api is not reponding or seems responsive but no effect is shown in the cortext-project meteor app, check the followning :
- is the api port number correctly set
- is the mongodb server (host and port) the same in api and meteor
## "cannot find module bson"
Probably a bad mongodb install : remove node_modules/mongodb and do a fresh install from 'npm install mongodb'