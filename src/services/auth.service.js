import BaseService from "./base.service";
import api from "./api.service";

class AuthService extends BaseService {

    constructor() {
        super("/auth");
    }

    /** login  
     * @param {object} param
     * */
    login(param) {
        return api.post(this.URL + "/login", param)
    }

}

const authService = new AuthService();

export default authService;