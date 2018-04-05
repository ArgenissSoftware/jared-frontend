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
}

let signUpStore = new SignUpStore();

export default signUpStore;
