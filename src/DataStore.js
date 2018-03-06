import { extendObservable } from "mobx";

class DataStore {
  constructor() {
    extendObservable(this, {
      URL: "https://jared-backend.herokuapp.com",
      email: "",
      password: "",
      emailRegister: "",
      passwordRegister: "",
      repeatPassword: "",
      navigate: false
    });
  }

  getUrl() {
    return process.env.NODE_ENV === "development"
      ? "http://localhost:3000" //local endpoint
      : "https://jared-backend.herokuapp.com";
  }
}

let store = new DataStore();

export default store;
