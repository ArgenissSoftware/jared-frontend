## Table of Contents

- [Installation Steps](#installation-steps)
- [Dependencies](#dependencies)
- [Development Mode](#build)
- [Build](#build)
- [Deploy](#deploy)


## Installation Steps

* Install NodeJS
* Clone the Jared Front-End git repository
* Install React `npm install -g create-react-app`
* Move to jared-frontend folder
* Run `npm install`

## Dependencies
* "axios": "^0.18.0",
* "mobx": "^3.5.1",
* "mobx-react": "^4.4.2",
* "react": "^16.2.0",
* "react-dom": "^16.2.0",
* "react-router-dom": "^4.2.2",
* "react-scripts": "1.1.0",
* "semantic-ui-css": "^2.2.14",
* "semantic-ui-react": "^0.78.1"
* "babel-plugin-transform-class-properties": "^6.24.1",
* "babel-plugin-transform-decorators-legacy": "^1.3.4"

# Development Mode
Run `npm start` on jared-frontend folder

# Build

# Deploy
* Run `heroku config:set REACT_APP_API_HOST=https://jared-backend.herokuapp.com` on jared-frontend folder
* Run `heroku open`

