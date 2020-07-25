# Login system app

## Overview
This is a small nodeJs application that let you to:
* make registrations and store hashed passwords into a mongoDb database
* authenticate and authorize users
* Login and logout operations
* view a secret page if the username and password are correct

## Tools
* Nodejs
* MongoDb  
* Passport
* Mongoose
## Setup  
* Clone the app  
  `https://github.com/iliassh1/nodejs-login-system.git`
  `cd nodejs-login-system`
 * Install dependencies  
   `npm install`
 * Run the server  
   `npm start`
## Test
* Browser  
`http://127.0.0.1:3000`
* Command Line  
`curl -v -d "userName=foo&password=bar" http://127.0.0.1:3000/login`