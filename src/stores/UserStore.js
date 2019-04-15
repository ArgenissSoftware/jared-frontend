import {
  decorate,
  action,
  observable
} from "mobx";
import moment from "moment";
import UsersService from "../services/users.service"
import authStore from "./AuthStore";
import usersService from "../services/users.service";
import { md5 } from '../services/util.service';
import _ from 'lodash';

/**
 * User Store
 */
class UserStore {
  user;
  error = '';
  oldPassword = '';
  newPassword = '';
  newPassword2 = '';
  clients = [];
  userList = [];
  userCount = 0;

  constructor() {
    this.clearUser();
  }

  /**
   * Set user field
   * @param {string} field
   * @param {mixed} value
   */
  setUserField(field, value) {
    this.user[field] = value;
  }

  /**
   * Set error
   * @param {string} error
   */
  setError(error) {
    this.error = error;
  }

  /**
   * Clear user data
   */
  clearUser() {
    const emptyUser = {
      "_id":"",
      "active":true,
      "relation":"",
      "alarmCode": "",
      "clients":[],
      "roles":[],
      "name":"",
      "surname":"",
      "password":"",
      "username":"",
      "email":"",
      "birthday":"",
      "startWorkDate":"",
      "visa":""
    }
    this.user = emptyUser;
  }

  /**
   * Get user avatar image
   * @param {string} email
   * @param {string} query
   */
  getAvatar(email, query) {
    const formattedEmail = ('' + email).trim().toLowerCase();
    let hash = md5(formattedEmail);
    return `https://www.gravatar.com/avatar/${hash}.jpg?${query}`;
  }

  /**
   * add user
   * @param {object} param
   */
  async add(param) {
    const response = await UsersService.add(param);
    this.user = response.data.data.user;
    this.parseData();
    return response;
  }

  /**
   * softdelete user
   */
  async disable() {
    const response = await UsersService.disable(this.user._id);
    if(authStore.user._id == this.user._id){
      authStore.clearAuth();
    }
    return response;
  }

  /**
   * Get user by mail
   * @param {string} mail
   */
  async getUserData(mail) {
    const response = await UsersService.getByEmail(mail);
    this.user = response.data.data;
    this.parseData();
  }

  /**
   * Get user by id
   * @param {mixed} mail
   */
  async getUserById(param) {
    const response = await UsersService.get(param);
    this.user = response.data.data;
    this.parseData();
  }

  /**
   * Update user
   */
  async updateUser() {
    this.setError('');
    if( authStore.user._id == this.user._id ){
      authStore.user.username = this.user.username;
    }
    await UsersService.update(this.user)
  }

  /**
   * get all users
   */
  async getUsersList(pageNum, pageSize, search) {
    return UsersService.getList(pageNum, pageSize, search)
      .then((response) => {
        this.setUsers(response.data.data);
      }
      ).catch(function (error) {
        console.log(error);
      });
  }

  setUsers(data) {
    this.userList = data.list;
    this.userCount = data.count;
  }

  /**
   * get user from github
   */
  async getGitHubUser(githubID) {
    return UsersService.getGitHubUser(githubID).then(res => {
      let completeName = res.data.name
      if (completeName) {
        let name = completeName.split(" ")[0];
        let surname = completeName.split(" ")[1];
        this.user.name = name;
        this.user.surname = surname;
      }
      this.user.githubID = githubID;
    })
  }

  async removeRelation(client) {
    try {
      _.remove(this.user.clients, (cli) => {
        return cli._id == client._id
      });
      var index = this.user.clients.indexOf(client._id);

      if (index > -1) {
        this.user.clients.splice(index, 1);
      }
      await usersService.removeRelation(this.user._id, client._id, "/assign/client/");

    } catch(err) {
      // in case of failure will add the user again
      if (index > -1 ) {
        this.user.clients.push(client);
      }
      console.log(err);
    }
  }

  async addRelation(client) {
    try {
      this.user.clients.push(client);
      await usersService.addRelation(this.user._id, client._id, "/assign/client/");
    } catch(err) {
      _.remove(this.user.clients, (cli) => {
        return cli._id == client._id
      });
      console.log(err);
    }
  }

  /**
   * Add role to user
   * @param {string} newRole
   */
  addUserRole(newRole){
    if (this.user.roles.indexOf(newRole) === -1){
      this.user.roles.push(newRole)
    }
  }

  /**
   * Remove role from user
   * @param {string} role
   */
  deleteUserRole(role){
    var i = this.user.roles.indexOf(role)
    this.user.roles.splice(i, 1);
    let a = 2;
  }

  parseData() {
    this.user.birthday = this.user.birthday ? moment(this.user.birthday).add(1,'day').format("YYYY-MM-DD") : "";
    this.user.visa = this.user.visa ? moment(this.user.visa).add(1,'day').format("YYYY-MM-DD") : "";
    this.user.startWorkDate = this.user.startWorkDate ? moment(this.user.startWorkDate).add(1,'day').format("YYYY-MM-DD") : "";
    this.clients = this.user.clients ? this.user.clients : [];
  }

}

decorate(UserStore, {
  user: observable,
  error: observable,
  oldPassword: observable,
  newPassword: observable,
  newPassword2: observable,
  clients: observable,
  userCount: observable,
  userList: observable,
  setUserField: action,
  setUsers: action,
  getUserById: action,
  setError: action,
  addUserRole: action,
  deleteUserRole: action
})

let userStore = new UserStore();

export default userStore;