import AppStore from "../stores/AppStore";

class BaseService {

    constructor(url) {
        this.URL = AppStore.URL + url;
    }
}


export default BaseService;