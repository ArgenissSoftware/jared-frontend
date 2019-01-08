import { extendObservable, set } from "mobx";

class SignInStore {
  constructor() {
    extendObservable(this, {
      username: "",
      password: ""
    });
  }

  set(name, value) {
    this[name] = value;
  }

  clear(){
    this.username = "";
    this.password = "";
  }
}

let signInStore = new SignInStore();

export default signInStore;
