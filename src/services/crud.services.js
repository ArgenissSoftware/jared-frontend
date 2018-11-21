import axios from "axios";
import BaseService from "./base.service";

class CrudService extends BaseService {

    constructor(url) {
        super(url);
    }
    /** request for all records */
    getList() {
        return axios.get(this.URL, this.getHeaders())
    }
    /** request for a record by Id */
    get(param) {
        return axios
            .get(this.URL + param, this.getHeaders())
    }
    /** request for save a new record */
    add(param) {
        return axios
            .post(this.URL, param, this.getHeaders())
    }
    /** reques for update a record */
    update(param) {
        return axios
            .put(this.URL + param._id, param, this.getHeaders())
    }



}

export default CrudService;