## Table of Contents

- [Installation Steps](#installation-steps)
- [Development Mode](#build)
- [Build](#build)
- [Deploy](#deploy)
- [Select Endpoints URL](#select-endpoints-url)





## Installation Steps

* Install NodeJS
* Clone the Jared Front-End git repository
* Move to jared-frontend folder
* Run `npm install`


# Development Mode
Run `npm start` on jared-frontend folder


# Build
Run `npm build` on jared-frontend folder


# Deploy
* Run `heroku git:remote -a jared-frontend`
* Run `git add .`
* Run `git commit -m "react-create-app on Heroku"`
* Run `git push heroku master`
* Run `heroku open`

# Select Endpoints URL
* Run `heroku config:set REACT_APP_API_HOST=https://jared-backend.herokuapp.com` on jared-frontend folder (replace https://jared-backend.herokuapp.com for your URL )
* Run `heroku open`


