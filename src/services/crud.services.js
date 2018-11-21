import axios from "axios";
import BaseService from "./base.service";

class CrudService extends BaseService {

    constructor(url) {
        super(url);
    }

    getList() {
        return axios.get(this.URL, this.getHeaders())
    }

    get(param) {
        return axios
            .get(this.URL + param, this.getHeaders())
    }

    add(param) {
        return axios
            .post(this.URL, param, this.getHeaders())
    }

    update(param) {
        return axios
            .put(this.URL + param._id, param, this.getHeaders())
    }



}

export default CrudService;