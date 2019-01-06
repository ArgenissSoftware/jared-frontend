import {
  decorate,
  action,
  observable
} from "mobx";
import moment from "moment";
import UsersService from "../services/users.service"
import authStore from "./AuthStore";

/**
 * User Store
 */
class UserStore {
  user = {};
  error = '';
  oldPassword = '';
  newPassword = '';
  newPassword2 = '';
  clients = [];
  userList = [];

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

  clearUser(){
    this.user = {};
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
  async getUsersList() {
    return UsersService.getList()
      .then((response) => {
        this.userList = response.data.data;
        return response.data;
      }
      ).catch(function (error) {
        console.log(error);
      });
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

  parseData() {
    this.user.birthday = this.user.birthday ? moment(this.user.birthday).format("YYYY-MM-DD") : "";
    this.user.visa = this.user.visa ? moment(this.user.visa).format("YYYY-MM-DD") : "";
    this.user.startWorkDate = this.user.startWorkDate ? moment(this.user.startWorkDate).format("YYYY-MM-DD") : "";
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
  userList: observable,
  setUserField: action,
  getUserById: action,
  setError: action
})

let userStore = new UserStore();

export default userStore;