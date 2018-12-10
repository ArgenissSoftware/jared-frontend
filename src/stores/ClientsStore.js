import { extendObservable } from "mobx";
import axios from "axios";
import AppStore from "../stores/AppStore";
import authStore from "./AuthStore";
import { getOne, getList } from "../services/BaseService";

class ClientsStore {
  constructor() {
    extendObservable(this, {
      clients: [],
      newClientsInput: "",
      client: {}
    });
  }

  async getClientsList() {
    await axios
      .get(AppStore.URL + "/clients", {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
    // await getList('/clients')
      .then(response => {
        this.clients = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async getClient(id) {
    await axios
      .get(AppStore.URL + "/clients/" + id, {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
    // getOne("/clients/" + id)
      .then(response => {
        this.client = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}

let clientsStore = new ClientsStore();

export default clientsStore;
