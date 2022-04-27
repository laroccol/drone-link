# Drone Link

## API
> This sub-folder handles all of the backend business logic and API connectivity.

## Framework
- Express 
	- Server
## NPM Packages 
 - babel 
	 - compiles from ES6 to ES5
- nodemon 
	- quick reload
- body-parser 
	- read  ``json ``body of ``post``
- npm-run-all
	- run multiple npm scripts in one command 
- rethinkdb
	- connector to database
- mqtt
	- connector to IOT MQTT service 

## Running Locally 
> If, for some reason, you wish to run the server standalone you can. <br/>
> *Note:* **The server relies on the database and mqtt broker also being instantiated locally.**<br/>
> Run the following command: ``npm run dev:watch``<br/>

**This is not a recommended way of running the environment, as there are no scripts to launch the database and mqtt independently from docker*