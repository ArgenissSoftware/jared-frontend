import { extendObservable } from "mobx";
import clientService from "../services/client.service";

class ClientsStore {
  constructor() {
    extendObservable(this, {
      clients: [],
      newClientsInput: "",
      client: {}
    });

  }

  async getClientsList() {
    await clientService.getList()
      .then(response => {
        this.clients = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async getClient(id) {
    await clientService.get(id)
      .then(response => {
        this.client = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async addClient() {
    if (this.newClientsInput) {
      await clientService.add({ name: this.newClientsInput })
        .then(response => {
          this.getClientsList();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    ClientsStore.newClientsInput = "";
  }

  async update() {
    await clientService.update(this.client)
      .then(
        function (response) {
          //confirmation semantic modal
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  }
}

let clientsStore = new ClientsStore();

export default clientsStore;
