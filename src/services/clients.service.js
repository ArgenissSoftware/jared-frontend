import CrudService from "./crud.services";

class ClientsService extends CrudService {
  constructor() {
    super("/clients");
  }
}

const clientsService = new ClientsService();

export default clientsService;