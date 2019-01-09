import CrudService from "./crud.services";
import api from "./api.service";

class ClientsService extends CrudService {
  constructor() {
    super("/clients");
  }

  removeRelation(userId, clientId){
    const endpoint = "/" + clientId + "/assign/developer/" + userId;
    return api.delete(this.URL + endpoint, userId);
  }

  addRelation(userId, clientId){
    const endpoint = "/" + clientId + "/assign/developer/" + userId;
    return api.post(this.URL + endpoint, userId);
  }

}

const clientsService = new ClientsService();

export default clientsService;