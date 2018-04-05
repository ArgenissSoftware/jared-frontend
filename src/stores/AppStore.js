import { extendObservable } from "mobx";

class AppStore {
  constructor() {
    extendObservable(this, {
      URL: process.env.REACT_APP_API_HOST || "http://localhost:3000",
    });
  }

  getUrl() {
    return process.env.NODE_ENV === "development"
      ? "http://localhost:3000" //local endpoint
      : "https://jared-backend.herokuapp.com";
  }
}

let store = new AppStore();

export default store;
