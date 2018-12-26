
class AppStore {
  constructor() {
    this.URL = process.env.REACT_APP_API_HOST || "http://192.168.99.100:3000/api"
  }
}

let store = new AppStore();

export default store;
