
class AppStore {
  constructor() {
    this.URL = process.env.REACT_APP_API_HOST || "https://jared-frontend.herokuapp.com/api"
  }
}

let store = new AppStore();

export default store;
