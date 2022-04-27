# Drone Link

## Client
> This sub-folder handles all of the front-end logic

## Framework
- React
## NPM Packages 
- router
	- client-side rendered paths
 - webpack
	 - compiles all JS files to one static bundle
	 - allows for server to serve front-end in one command
	 - automatically rebuilds upon changes with the ``--watch`` flag
- babel
	- ES6 to ES5 syntax in ``bundle.js`` 
- redux
	- global state for the entire react application
- redux-thunk
	- allows for async events in redux ``actions`` and ``dispatches``
	- useful when reading from API endpoint and populating the store
- webpack-dev-server
	- local development
		- This has no connectivity functionality with API
- html-loader
	- load and server the static html file in which react hooks into
		- Locally only!
- material-ui
	- google material theme with large amounts of pre-built components
	- https://material-ui.com/

## Running Locally 
> This is only recommended when developing entirely front-end. This means there is no use for the API, etc. <br/>
> Local Command: ``npm run local`` <br/>
> This will launch a local dev server which enables hot-reloading.