# mcgenie2
Simple configurable web application framework for Mobicontrol API

before you can get and run McGenie in your computer you will need
git node.js  mongodb


This project has 3 components

1) "db" a db server that keeps information in local mongdodb (make sure local mongodb is running)
2) "backend" an api server that acts as the backend of mcgenie been an authorization provider and api gateway
3) "frontend" a front end to actually run the genie administration app and the actual apps.


To build and run this project go each of this folders and do

-npm install
-npm start

you will benefits from using different terminals for each of the 3 projects.

make sure your mongo db is running, otherwise start it as well.

the front end runs on port 3000.

you can use this urls to access its parts:

http://localhost:3000/mcgenie    (the actual genie admin interface)
http://localhost:3000/mcg        (the atual generated app running)

use http://localhost:3000/mcg0 , http://localhost:3000/mcg1, http://localhost:3000/mcg2,..etc to access other versions

http://localhost:3000/login is to login
http://localhost:3000/home is a temporary backdoor page that let us get a new token and other things.





