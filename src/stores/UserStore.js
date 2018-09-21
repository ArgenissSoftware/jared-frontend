import {
  decorate,
  action,
  observable
} from "mobx";
import axios from "axios";
import AppStore from "./AppStore";
import moment from "moment";
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

  /**
   * Get user by mail or id
   * @param {mixed} mail
   */
  async getUserData(mail) {
    let url = "";
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isMail;

    if (re.test(mail)) {
      url = AppStore.URL + "/users?email=" + mail;
      isMail = true;
    } else {
      url = AppStore.URL + "/users/" + mail;
      isMail = false;
    }

    await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
      .then((response) => {
          let res;

          if (isMail) {
            res = response.data.data[0];
          } else {
            res = response.data.data;
          }
          this.user = res;
          this.user.birthday = moment(res.birthday).format("YYYY-MM-DD") || "";
          this.user.visa = moment(res.visa).format("YYYY-MM-DD") || "";
          this.user.startWorkDate = moment(res.startWorkDate).format("YYYY-MM-DD") || "";
          this.clients = res.clients || [];
        })
      .catch(error => {
        console.log(error);
      });
  }

  async updateUser() {
    this.setError('');
    return axios
      .put(AppStore.URL + '/users/' + this.user._id,  this.user, {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
      .then((response) => {
          return response.data;
        }
      )
      .catch(error => {
        this.setError('Error updating');
        if (error.response && error.response.data) {
          return error.response.data;
        }
        throw error;
      });
  }

  async getUsersList() {
    return axios
      .get(AppStore.URL + "/users", {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
      .then((response) => {
        this.userList = response.data.data;
        return response.data;
        }
      )
      .catch(function (error) {
        console.log(error);
      });
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