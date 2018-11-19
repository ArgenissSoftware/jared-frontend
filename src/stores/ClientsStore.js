import { extendObservable } from "mobx";
import clientsService from "../services/clients.service";

class ClientsStore {
  constructor() {
    extendObservable(this, {
      clients: [],
      newClientsInput: "",
      client: {}
    });

  }

  async getClientsList() {
    await clientsService.getList()
      .then(response => {
        this.clients = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getClient(id) {
    await clientsService.get(id)
      .then(response => {
        this.client = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async addClient() {
    if (this.newClientsInput) {
      await clientsService.add({ name: this.newClientsInput })
        .then(response => {
          this.getClientsList();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    ClientsStore.newClientsInput = "";
  }

  async update() {
    await clientsService.update(this.client)
      .catch((error) => {
        console.log(error);
      });
  }
}

let clientsStore = new ClientsStore();

export default clientsStore;
