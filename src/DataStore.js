import { extendObservable } from "mobx";

class DataStore {
  constructor() {
    extendObservable(this, {
      //  URL: "https://jared-backend.herokuapp.com",
      URL: process.env.REACT_APP_API_HOST,
      email: "",
      password: "",
      emailRegister: "",
      passwordRegister: "",
      repeatPassword: "",
      navigate: false
    });
  }
}

let store = new DataStore();

export default store;
