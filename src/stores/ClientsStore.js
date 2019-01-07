import { extendObservable } from "mobx";
import clientsService from "../services/clients.service";

class ClientsStore {
  constructor() {
    extendObservable(this, {
      clients: [],
      client: {}
    });

  }

  async getClientsList() {
    try {
      const response = await clientsService.getList();
      this.clients = response.data.data;
    } catch (err) {
      console.error(err);
    }
  }

  async getClient(id) {
    try {
      const response = await clientsService.get(id);
      this.client = response.data.data;
    } catch (err) {
      console.error(err);
    }
  }

  clearClient(){
    this.client = {};
  }

  async addClient() {
    try {
        await clientsService.add(this.client);
        this.getClientsList();
    } catch (err) {
      console.error(err);
    }
  }

  async update() {
    await clientsService.update(this.client);
  }
}

let clientsStore = new ClientsStore();

export default clientsStore;
