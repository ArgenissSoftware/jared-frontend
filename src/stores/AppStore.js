import { extendObservable } from "mobx";

class AppStore {
  constructor() {
    extendObservable(this, {
      URL: process.env.REACT_APP_API_HOST || "http://localhost:3000/api"
    });
  }
}

let store = new AppStore();

export default store;
