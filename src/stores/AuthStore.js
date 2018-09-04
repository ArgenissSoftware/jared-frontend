import {extendObservable} from "mobx";
import axios from "axios";
import AppStore from "./AppStore";
import signInStore from "./SignInStore";
import userStore from "./UserStore";

class AuthStore {
  constructor() {
    const token = sessionStorage.getItem('user_token');
    userStore.user = JSON.parse(sessionStorage.getItem('user')) || [];

    extendObservable(this, {
      username: "",
      token: token || ""
    });
  }

  login(url, data) {
    return axios
      .post(AppStore.URL + url, data)
      .then((response) => {
        signInStore.navigate = true;
        signInStore.clear();
        return response.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  setUserAuth(data) {
    this.token = data.token;
    sessionStorage.setItem('user_token', JSON.stringify(data.token));
    sessionStorage.setItem('user', JSON.stringify(data.user));
    userStore.user = data.user;
    userStore.user.id = data.user._id;
  }
}

let authStore = new AuthStore();

export default authStore;
