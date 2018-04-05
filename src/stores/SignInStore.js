import { extendObservable } from "mobx";

class SignInStore {
  constructor() {
    extendObservable(this, {
      email: "",
      password: "",
      navigate: false
    });
  }
}

let signInStore = new SignInStore();

export default signInStore;
