import { extendObservable } from "mobx";
import clientsService from "../services/clients.service";
import userStore from "./UserStore";

class ClientsStore {
  constructor() {
    extendObservable(this, {
      clients: [],
      client: {},
      oldEmployees: []
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
      this.oldEmployees = this.client.employees;
    } catch (err) {
      console.error(err);
    }
  }

  clearClient() {
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

  async removeRelation(userId) {
    try {
      const response = await clientsService.removeRelation(userId, this.client._id);
      this.oldEmployees = response.data.data.employees;
    } catch(err) {
      console.log(err);
    }
  }

  async addRelation(userId) {
    try {
      const response = await clientsService.addRelation(userId, this.client._id);
      this.oldEmployees = response.data.data.employees;
    } catch(err) {
      console.log(err);
    }
  }

}

let clientsStore = new ClientsStore();

export default clientsStore;
