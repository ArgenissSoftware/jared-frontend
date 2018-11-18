import { extendObservable } from "mobx";
import AuthService from "../services/auth.service"
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
    } catch (e) {
      user = null;
    }
    extendObservable(this, {
      username: "",
      token: token || "",
      user
    });
  }

  async login(data) {
    return AuthService.login(data).then((response) => {
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
    sessionStorage.setItem('user_token', data.token);
    sessionStorage.setItem('user', JSON.stringify(data.user));
    this.user = data.user;
  }

  isLoggedIn() {
    console.log('logged ', (this.token && this.user) ? 'si' : 'no')
    return this.token && this.user;
  }

  clearAuth() {
    this.token = '';
    this.user = null;
    sessionStorage.removeItem('user_token');
    sessionStorage.removeItem('user');
  }
}

let authStore = new AuthStore();

export default authStore;
