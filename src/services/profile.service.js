import api from "./api.service"
import BaseService from "./base.service";

class ProfileService extends BaseService {

    constructor() {
        super("/me");
    }

    /** request for forgetting the password */
    forgotPasword(mail) {
        return api
            .post(this.URL + "/forgot_password", {
                email: mail
            });
    }

}

const profileService = new ProfileService();

export default ProfileService;