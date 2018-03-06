import { extendObservable } from "mobx";

class DataStore {
  constructor() {
    extendObservable(this, {
      //    URL: "https://jared-backend.herokuapp.com",
      URL: process.env.REACT_APP_API_HOST,
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
