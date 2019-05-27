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
import CrudStore from "./CrudStore";

/**
 * User Store
 */
class UserStore  extends CrudStore{
  user;
  error = '';
  oldPassword = '';
  newPassword = '';
  newPassword2 = '';
  clients = [];
  userList = [];
  userCount = 0;

  constructor() {
    super(usersService)
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
   * softdelete user
   */
  async disable() {
    const response = await UsersService.disable(this.user._id);
    if(authStore.user._id === this.user._id){
      authStore.clearAuth();
    }
    return response;
  }

  /**
   * Get user by mail
   * @param {string} email
   */
  async getByEmail(email) {
    const response = await UsersService.getByEmail(email);
    this.user = response.data.data;
    this.parseData();
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
  removeUserRole(role){
    var i = this.user.roles.indexOf(role)
    this.user.roles.splice(i, 1);
  }

  parseData() {
    this.user.birthday = this.user.birthday ? moment(this.user.birthday).add(1,'day').format("YYYY-MM-DD") : "";
    this.user.visa = this.user.visa ? moment(this.user.visa).add(1,'day').format("YYYY-MM-DD") : "";
    this.user.startWorkDate = this.user.startWorkDate ? moment(this.user.startWorkDate).add(1,'day').format("YYYY-MM-DD") : "";
    this.clients = this.user.clients ? this.user.clients : [];
  }

  /**
   * Crud funcions
   */


  /**
   * Get user by id
   * @id {mixed} mail
   */
  async get(id) {
    const response = await super.get(id);
    this.user = response.data.data;
    this.parseData();
  }

  /**
   * get all users
   */
  async getList(pageNum, pageSize, search) {
    let response = await super.getList(pageNum, pageSize, search)
    this.setUsers(response.data.data);
  }

  /**
   * Update user
   */
  async update() {
    this.setError('');
    if( authStore.user._id === this.user._id ){
      authStore.user.username = this.user.username;
    }
    await super.update(this.user)
  }

  /**
   * add user
   * @param {object} param
   */
  async add(param) {
    const response = await super.add(param);
    this.user = response.data.data.user;
    this.parseData();
  }


  async removeRelation(client) {
    await super.removeRelation(this.user, client, "/assign/client/", this.user.clients)
  }

  async addRelation(client) {
    await super.addRelation(this.user._id, client._id, "/assign/client/", this.user.clients);
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
  get: action,
  setError: action,
  addUserRole: action,
  removeUserRole: action
})

let userStore = new UserStore();

export default userStore;