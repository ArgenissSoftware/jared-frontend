import { extendObservable } from "mobx";

class DataStore {
  constructor() {
    extendObservable(this, {
      URL: "https://jared-backend.herokuapp.com",
      email: "",
      password: "",
      emailRegister: "",
      passwordRegister: "",
      repeatPassword: ""
    });
  }
}

let store = new DataStore();

export default store;
