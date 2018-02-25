INTRODUCTION:
=============

This repo is a simple example of how a web api can be implemented using technologies such as node.js, express.js. 

NOTES:
======
1. Please install node version 9.5.0 as that is the version this solution has been tested with.

2. do `npm install` to install the packages, the versions are specified in the package.json.

	If require these details can be changed inthe solution from the configuration file: lib/Config/env/development.js, this would include: mailgun apikey and domain, plus sendgrid apikey and url. (please use your own if you can as my ones can send to limited email addresses)
- The application can be run via `node index.js`
