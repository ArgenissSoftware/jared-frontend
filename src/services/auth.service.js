import axios from "axios";
import BaseService from "./base.service";

class AuthService extends BaseService {

    constructor() {
        super("/auth");
    }

    /** overrride -  use to add headers to request  */
    getHeaders() {
        return {
            headers: {
                "Content-Type": "application/json"
            }
        }
    }

    /** login  
     * @param {object} param
     * */
    login(param) {
        return axios.post(this.URL + "/login", param, this.getHeaders())
    }

}

const authService = new AuthService();

export default authService;