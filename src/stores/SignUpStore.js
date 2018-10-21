import { extendObservable } from "mobx";

class SignUpStore {
  constructor() {
    extendObservable(this, {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
      navigate: false
    });
  }

  clear() {
    this.email = "";
    this.username = "";
    this.password = "";
    this.repeatPassword = "";
  }
  
}

let signUpStore = new SignUpStore();

export default signUpStore;
