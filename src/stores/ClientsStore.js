import { extendObservable } from "mobx";
import clientsService from "../services/clients.service";
import userStore from "./UserStore";

class ClientsStore {
  constructor() {
    extendObservable(this, {
      clients: [],
      newClientsInput: "",
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

  async addClient() {
    try {
      if (this.newClientsInput) {
        await clientsService.add({ name: this.newClientsInput });
        this.getClientsList();
      }
      ClientsStore.newClientsInput = "";
    } catch (err) {
      console.error(err);
    }
  }

  async update() {
    if(this.oldEmployees === this.client.employees){
    await clientsService.update(this.client);
    }else{
      this.checkEmployees();
    }
  }

  async checkEmployees(){
    let newEmployees = this.client.employees;
    this.oldEmployees.array.forEach(userId => {
      let index = 0;
      let find = false
      while (index > newEmployees.length-1 && !find) {
        if(userId === newEmployees[index]){
          find = true;
          newEmployees = newEmployees.splice(index,1); //Remove it because in this variable we need only the new employees for this client
        }
      }
      if(!find){ //If the developer don't work anymore with this client
        userStore.finishRelation(userId, this.client._id);
      }
    });
    if(newEmployees){
    this.setNewRelations(newEmployees);
    }
  }

  setNewRelations(employees){
    employees.forEach(userId => {
      userStore.newRelation(userId, this.client._id);
    });
  }

}

let clientsStore = new ClientsStore();

export default clientsStore;
