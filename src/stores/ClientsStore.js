import { extendObservable } from "mobx";
import axios from "axios";
import AppStore from "../stores/AppStore";

class ClientsStore {
  constructor() {
    extendObservable(this, {
      clients: [],
      newClientsInput: ""
    });
  }

  async getUserData() {
    await axios
      .get(AppStore.URL + "/api/clients")
      .then(response => {
        this.clients = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

let clientsStore = new ClientsStore();

export default clientsStore;
