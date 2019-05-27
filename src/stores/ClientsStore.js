import {
  decorate,
  action,
  observable
} from "mobx";
import clientsService from "../services/clients.service";
import CrudStore from "./CrudStore";



class ClientsStore extends CrudStore{
  clients = [];
  client;
  clientCount = 0;

  constructor() {
    super(clientsService);
    this.clearClient();
  }

  setClients(data) {
    this.clients = data.list;
    this.clientCount = data.count;
  }

  setClientData(name, value) {
    this.client[name] = value;
  }

  clearClient() {
    const defaultClient = {
      "employees":[],
      "active":true,
      "name":"",
      "contactName":"",
      "address":"",
      "email":"",
      "url":""
    };
    this.client = defaultClient;
  }

  parseData() {
    this.client.employees = this.client.employees ? this.client.employees : [];
  }

  /**
   * Crud funcions
   */

  async get(id) {
    let response = await super.get(id)
    if (response){
      this.client = response.data.data;
      this.parseData();
    }
  }

  async getList(pageNum, pageSize, search) {
    let response = await super.getList(pageNum, pageSize, search)
    if (response){
      this.setClients(response.data.data);
    }
  }
  
  async add() {
    await super.add(this.client);
  }

  async update() {
    await super.update(this.client);
  }

  async removeRelation(user) {
    return await super.removeRelation(this.client, user, "/assign/developer/", this.client.employees);
  }

  async addRelation(user) {
    return await super.addRelation(this.client, user, "/assign/developer/", this.client.employees);
  }
}



decorate(ClientsStore, {
  client: observable,
  clients: observable,
  clientCount: observable,
  getList: action,
  setClients: action,
  add: action,
  addRelation: action,
  setClientData: action,
  removeRelation: action
})

let clientsStore = new ClientsStore();

export default clientsStore;
