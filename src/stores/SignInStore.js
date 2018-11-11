import { extendObservable } from "mobx";

class SignInStore {
  constructor() {
    extendObservable(this, {
      username: "",
      password: ""
    });
  }

  clear(){
    this.username = "";
    this.password = "";
  }
}

let signInStore = new SignInStore();

export default signInStore;
