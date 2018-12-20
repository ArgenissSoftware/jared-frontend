import { extendObservable } from "mobx";

class ErrorStore {
  constructor() {
    extendObservable(this, {
      message: ""
    });
  }
  
  clear() {
    this.message = "";
  }
}

let errorStore = new ErrorStore();
export default errorStore;
