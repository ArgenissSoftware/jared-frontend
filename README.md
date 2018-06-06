# JARED FRONTEND README
The Jared Project:
Jared is an ERP system for handling employees, customers other ERP features related with software companies.

## Table of Contents

- [Installation Steps](#installation-steps)
- [Development Mode](#build)
- [Build](#build)
- [Deploy](#deploy)
- [Select Endpoints URL](#select-endpoints-url)





## Installation Steps

* [Install NodeJS](https://nodejs.org/es/)
* Clone the Jared Front-End git repository
* Move to jared-frontend folder
* Run `npm install create-react-app`
* Run `npm install`


# Development Mode
* On Windows: In **package.json**, modify scripts start with `"start": "set PORT=3001 && react-scripts start"`
* On Linux: In **package.json**, modify scripts start with `"start": "PORT=3001 react-scripts start"`
* Run `npm start` on jared-frontend folder


# Build
Run `npm build` on jared-frontend folder


# Herou Deployment
* Run `heroku git:remote -a jared-frontend`
* Run `git add .`
* Run `git commit -m "react-create-app on Heroku"`
* Run `git push heroku master`
* Run `heroku open`

# Select Endpoints URL
* Run `heroku config:set REACT_APP_API_HOST=https://jared-backend.herokuapp.com` on jared-frontend folder (replace https://jared-backend.herokuapp.com with your URL )
* Run `heroku open`

# Git workflow
1. Update to the latest version of master - `$ git checkout master && git pull`
2. Create a new branch for working on the issue
  2.1 `$ git checkout -b features/<#issue_number>-<name>` (If it's a new feature)
  2.2 `$ git checkout -b bug_fixing/<#issue_number>-<name>` (If it's a bug)
3. Commit locally as you need - `$ git commit -m 'bla bla'`
4. Update your branch against master - `$ git fetch origin && git rebase origin master`
5. Push your branch to github - `$ git push origin <branch-name>`
6. Create a Pull request and assign a reviewer

# Test the application on heroku:
The application is running at: [](https://jared-backend.herokuapp.com)
