import { extendObservable } from "mobx";
import axios from "axios";
import AppStore from "./AppStore";
import signInStore from "./SignInStore";
import userStore from "./UserStore";
import moment from "moment";

class AuthStore {
  constructor() {
    extendObservable(this, {
      username: "",
      token: ""
    });
  }

  login(url, data){
      return axios
      .post(AppStore.URL + url,data)
      .then((response) => {
        signInStore.navigate = true;
        signInStore.clear();
        return response.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  setUserAuth(data){
    this.token = data.token;
    userStore.user = data.user;
    userStore.user.id = data.user._id;
  }
}

let authStore = new AuthStore();

export default authStore;
