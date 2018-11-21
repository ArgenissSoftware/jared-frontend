import axios from "axios";
import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";
import CrudService from "./crud.services";

class ClientsService extends CrudService {

    constructor() {
        super("/clients/");
    }
}

const clientsService = new ClientsService();

export default clientsService;