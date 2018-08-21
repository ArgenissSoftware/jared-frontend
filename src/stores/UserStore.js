import {
  extendObservable
} from "mobx";
import axios from "axios";
import AppStore from "./AppStore";
import moment from "moment";
import authStore from "./AuthStore";

class UserStore {
  constructor() {
    extendObservable(this, {
      user: [],
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      clients: [],
      userList: []
    });
  }

  async getUserData(mail) {
    let url = "";
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isMail;

    if (re.test(mail)) {
      url = AppStore.URL + "/user?email=" + mail;
      isMail = true;
    } else {
      url = AppStore.URL + "/user/" + mail;
      isMail = false;
    }

    await axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
      .then(
        function (response) {
          let res;

          if (isMail) {
            res = response.data.data[0];
          } else {
            res = response.data.data;
          }

          this.user = res;
          this.user.id = res._id; //CORREGIR Y QUITAR
          this.user.birthday = moment(res.birthday).format("YYYY-MM-DD") || "";
          this.user.visa = moment(res.visa).format("YYYY-MM-DD") || "";
          this.user.startWorkDate = moment(res.startWorkDate).format("YYYY-MM-DD") || "";
          this.clients = res.clients || [];
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  async updateUser() {
    return axios
      .put(AppStore.URL + "/user/",  this.user, {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
      .then((response) => {
          return response.data;
        }
      )
      .catch(function (error) {
        console.log(error);
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

let userStore = new UserStore();

export default userStore;