import { extendObservable } from "mobx";
import AuthService from "../services/auth.service"
import signInStore from "./SignInStore";
import { md5 } from '../services/util.service';

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

  async login(data) {
    const response = await AuthService.login(data)
    signInStore.clear();
    this.setUserAuth(response.data.data);
    return response.data;
  }

  async register(data){
    const response = await AuthService.register(data)
    return response;
  }

  setUserAuth(data) {
    this.token = data.token;
    localStorage.setItem('user_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    this.user = data.user;
  }

  isLoggedIn() {
    return this.token && this.user;
  }

  getAvatar(query) {
    const formattedEmail = ('' + this.user.email).trim().toLowerCase();
    let hash = md5(formattedEmail);
    return `https://www.gravatar.com/avatar/${hash}.jpg?${query}`;
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
