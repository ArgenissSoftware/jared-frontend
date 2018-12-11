import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";

class BaseService {

    constructor(url) {
        this.URL = AppStore.URL + url;
    }

    /** use to add headers to request */
    getHeaders() {
        return {
            headers: {
                "Authorization": "Bearer " + authStore.token,
                "Content-Type": "application/json"
            }
        }
    }
}


export default BaseService;