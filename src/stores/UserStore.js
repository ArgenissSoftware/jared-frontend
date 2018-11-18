import {
  decorate,
  action,
  observable
} from "mobx";
import moment from "moment";
import UserService from "../services/user.service"

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

  /**
   * Get user by mail or id
   * @param {mixed} mail
   */
  async getUserData(mail) {
    await UserService.getByEmail(mail)
      .then((response) => {
        this.user = response.data.data;
        this.parseData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getUserById(param) {
    await UserService.get(param)
      .then((response) => {
        this.user = response.data.data;
        this.parseData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  async updateUser() {
    this.setError('');
    return UserService.update(this.user)
      .then((response) => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getUsersList() {
    return UserService.getList()
      .then((response) => {
        this.userList = response.data.data;
        return response.data;
      }
      ).catch(function (error) {
        console.log(error);
      });
  }

  parseData() {
    this.user.birthday = moment(this.user.birthday).format("YYYY-MM-DD") || "";
    this.user.visa = moment(this.user.visa).format("YYYY-MM-DD") || "";
    this.user.startWorkDate = moment(this.user.startWorkDate).format("YYYY-MM-DD") || "";
    this.clients = this.user.clients || [];
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
  setError: action
})

let userStore = new UserStore();

export default userStore;