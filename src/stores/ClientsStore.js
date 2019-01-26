import {
  decorate,
  action,
  observable
} from "mobx";
import clientsService from "../services/clients.service";
import _ from 'lodash';

class ClientsStore {
  clients = [];
  client = {employees: []};
  clientCount = 0;

  async getClientsList(pageNum, pageSize, search) {
    try {
      const response = await clientsService.getList(pageNum, pageSize, search);
      this.setClients(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  setClients(data) {
    this.clients = data.list;
    this.clientCount = data.count;
  }

  async getClient(id) {
    try {
      const response = await clientsService.get(id);
      this.client = response.data.data;
      this.parseData();
    } catch (err) {
      console.error(err);
    }
  }

  clearClient() {
    this.client = {};
  }

  async addClient() {
    await clientsService.add(this.client);
  }

  async update() {
    await clientsService.update(this.client);
  }

  async removeRelation(user) {
    try {
      _.remove(this.client.employees, (u) => {
        return u._id == user._id;
      });
      var index = this.client.employees.indexOf(user._id);

      if (index > -1) {
        this.client.employees.splice(index, 1);
      }
      await clientsService.removeRelation(this.client._id, user._id, "/assign/developer/");

    } catch(err) {
      // in case of failure will add the user again
      if (index > -1 ) {
        this.client.employees.push(user);
      }
      console.log(err);
    }
  }

  async addRelation(user) {
    try {
      this.client.employees.push(user);
      await clientsService.addRelation(this.client._id, user._id, "/assign/developer/");
    } catch(err) {
      _.remove(this.client.employees, (u) => {
        return u._id == user._id;
      });
      console.log(err);
    }
  }

  parseData() {
    this.client.employees = this.client.employees ? this.client.employees : [];
  }
}



decorate(ClientsStore, {
  client: observable,
  clients: observable,
  clientCount: observable,
  getClientsList: action,
  setClients: action,
  addClient: action,
  addRelation: action,
  removeRelation: action
})

let clientsStore = new ClientsStore();

export default clientsStore;
