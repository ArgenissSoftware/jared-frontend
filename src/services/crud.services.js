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
    get(id) {
        return axios
            .get(this.URL + "/" + id, this.getHeaders())
    }
    /** request for save a new record */
    add(obj) {
        return axios
            .post(this.URL, obj, this.getHeaders())
    }
    /** reques for update a record */
    update(obj) {
        return axios
            .put(this.URL + "/" + obj._id, obj, this.getHeaders())
    }



}

export default CrudService;