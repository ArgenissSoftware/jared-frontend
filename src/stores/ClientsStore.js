import {
  decorate,
  action,
  observable
} from "mobx";
import clientsService from "../services/clients.service";

class ClientsStore {
  clients = [];
  client = {employees: []};

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

      var index = this.client.employees.indexOf(userId);

      if (index > -1) {
        this.client.employees.splice(index, 1);
      }
      await clientsService.removeRelation(userId, this.client._id, "/assign/developer/");

    } catch(err) {
      // in case of failure will add the user again
      if (index > -1 ) {
        this.client.employees.push(userId);
      }
      console.log(err);
    }
  }

  async addRelation(userId) {
    try {
      this.client.employees.push(userId);
      await clientsService.addRelation(this.client._id, userId, "/assign/developer/");
    } catch(err) {
      console.log(err);
    }
  }
}

decorate(ClientsStore, {
  client: observable,
  clients: observable,
  getClientsList: action,
  addRelation: action,
  removeRelation: action
})

let clientsStore = new ClientsStore();

export default clientsStore;
