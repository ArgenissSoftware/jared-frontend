import axios from "axios";
import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";

class ClientService {


    getClientsList() {
        return axios.get(AppStore.URL + "/clients", {
            headers: {
                Authorization: "Bearer " + authStore.token
            }
        })
    }


    getClient(id) {
        return axios
            .get(AppStore.URL + "/clients/" + id, {
                headers: {
                    Authorization: "Bearer " + authStore.token
                }
            })
    }


    addClient(client) {
        return axios
            .post(
                AppStore.URL + "/clients/", client,
                {
                    headers: {
                        Authorization: "Bearer " + authStore.token,
                        "Content-Type": "application/json"
                    }
                }
            )
    }

    update(client) {
        return axios
            .put(AppStore.URL + "/clients/" + client._id, client,
                {
                    headers: {
                        Authorization: "Bearer " + authStore.token
                    }
                })
    }
}


const clientService = new ClientService();

export default clientService;