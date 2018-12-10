import { extendObservable } from "mobx";
import axios from "axios";
import AppStore from "./AppStore";
import signInStore from "./SignInStore";
import { postOne } from "../services/BaseService";

/**
 * Auth Store
 */
class AuthStore {

  constructor() {
    const token = localStorage.getItem('user_token');
    let user;

    try {
      user = JSON.parse(localStorage.getItem('user')) || null;
    } catch(e) {
      user = null;
    }
    console.log(user)
    extendObservable(this, {
      username: "",
      token: token || "",
      user
    });
  }

  login(data) {
    console.log("Metodo login()")
    return axios
      .post(AppStore.URL + '/auth/login', data)
    // return postOne('/auth/login', data)
      .then((response) => {
        signInStore.navigate = true;
        signInStore.clear();
        this.setUserAuth(response.data.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error", error);
        throw error;
      });
  }

  setUserAuth(data) {
    this.token = data.token;
    localStorage.setItem('user_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.user = data.user;
  }

  isLoggedIn() {
    console.log('logged ', (this.token && this.user) ? 'si':'no')
    return this.token && this.user;
  }

  clearAuth() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('user_token');
    localStorage.removeItem('user');
  }
}

let authStore = new AuthStore();

export default authStore;
