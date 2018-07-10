import { extendObservable } from "mobx";

class SignInStore {
  constructor() {
    extendObservable(this, {
      email: "",
      password: "",
      navigate: false
    });
  }

  clear(){
    this.email = "";
    this.password = "";
  }
}

let signInStore = new SignInStore();

export default signInStore;
