
## Table of Contents
- [Deploy](#heroku-deployment)
- [Select Endpoints URL](#select-endpoints-url)

# Heroku Deployment
* Run `heroku git:remote -a jared-frontend`
* Run `git add .`
* Run `git commit -m "react-create-app on Heroku"`
* Run `git push heroku master`
* Run `heroku open`

# Select Endpoints URL
* Run `heroku config:set REACT_APP_API_HOST=https://jared-frontend.herokuapp.com/api` on jared-frontend folder (replace https://jared-frontend.herokuapp.com with your URL )
* Run `heroku open`
