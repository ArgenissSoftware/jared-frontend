import axios from "axios";
import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";

class ClientsService {

    constructor() {
        this.URL = AppStore.URL + "/clients/";
        this.headers = {
            headers: {
                "Authorization": "Bearer " + authStore.token,
                "Content-Type": "application/json"
            }
        }
    }

    getList() {
        return axios.get(this.URL, this.headers)
    }

    get(param) {
        return axios
            .get(this.URL + param, this.headers)
    }

    add(param) {
        return axios
            .post(this.URL, param, this.headers)
    }

    update(param) {
        return axios
            .put(this.URL + param._id, param, this.headers)
    }

}

const clientsService = new ClientsService();

export default clientsService;