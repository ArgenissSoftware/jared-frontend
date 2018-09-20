import { extendObservable } from "mobx";
import axios from "axios";
import AppStore from "./AppStore";
import signInStore from "./SignInStore";

/**
 * Auth Store
 */
class AuthStore {

  constructor() {
    const token = sessionStorage.getItem('user_token');
    let user;

    try {
      user = JSON.parse(sessionStorage.getItem('user')) || [];
    } catch(e) {
      user = null;
    }
    extendObservable(this, {
      username: "",
      token: token || "",
      user
    });
  }

  login(url, data) {
    return axios
      .post(AppStore.URL + url, data)
      .then((response) => {
        signInStore.navigate = true;
        signInStore.clear();
        this.setUserAuth(response.data.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  setUserAuth(data) {
    this.token = data.token;
    sessionStorage.setItem('user_token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
    this.user = data.user;
  }
}

let authStore = new AuthStore();

export default authStore;
