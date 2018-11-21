import axios from "axios";
import BaseService from "./base.service";

class ProfileService extends BaseService {

    constructor() {
        super("/me/");
    }

    /** request for forgetting the password */
    forgotPasword(params) {
        return axios
            .post(this.URL + "forgot_password", {
                email: params
            });
    }

}

const profileService = new ProfileService();

export default ProfileService;