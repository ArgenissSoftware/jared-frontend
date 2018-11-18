import axios from "axios";
import AppStore from "../stores/AppStore";

class AuthService {

    constructor() {
        this.URL = AppStore.URL + "/auth/login";
        this.headers = {
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    login(param) {
        return axios.post(this.URL, param, this.headers)
    }

}

const authService = new AuthService();

export default authService;