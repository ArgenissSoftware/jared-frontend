
import CrudService from "./crud.services";

class MyClientsService extends CrudService {
  constructor() { 
        super('/myclients'); 
  }  
}

const myClientsService = new MyClientsService();
  
export default myClientsService;
