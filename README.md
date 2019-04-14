# JARED FRONTEND README
The Jared Project:
Jared is an ERP system for handling employees, customers other ERP features related with software companies.

## Table of Contents

- [Installation Steps](#installation-steps)
- [Development Mode](#build)
- [Build](#build)

# Installation Steps

* [Install NodeJS](https://nodejs.org/es/)
* Clone the Jared Front-End git repository
* Move to jared-frontend folder
* Install dependecies:
    * With npm: `npm install`
    * Or with yarn: `yarn`

# Development Mode
* Run `npm start` or `yarn start` on jared-frontend folder

# Build
Run `npm build` or `yarn build` on jared-frontend folder

# Git workflow
1. Update to the latest version of master - `$ git checkout master && git pull`
2. Create a new branch for working on the issue
  2.1 `$ git checkout -b features/<#issue_number>-<name>` (If it's a new feature)
  2.2 `$ git checkout -b bug_fixing/<#issue_number>-<name>` (If it's a bug)
3. Commit locally as you need - `$ git commit -m 'bla bla'`
4. Update your branch against master - `$ git fetch origin && git rebase origin master`
5. Push your branch to github - `$ git push origin <branch-name>`
6. Create a Pull request and assign a reviewer
