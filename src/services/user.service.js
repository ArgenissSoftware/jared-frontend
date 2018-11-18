import axios from "axios";
import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";

class UserService {

    constructor() {
        this.URL = AppStore.URL + "/users/";
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

    getByEmail(param) {
        return axios
            .get(this.URL + "?email=" + param, this.headers)
    }

}

const userService = new UserService();

export default userService;