import axios from "axios";
import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";

class ProfileService {

    constructor() {
        this.URL = AppStore.URL + "/users/";
        this.headers = {
            headers: {
                "Authorization": "Bearer " + authStore.token,
                "Content-Type": "application/json"
            }
        }
    }

    forgotPasword(params) {
        return axios
            .post(this.URL + "forgot_password", {
                email: params
            })
    }

}

const profileService = new ProfileService();

export default ProfileService;