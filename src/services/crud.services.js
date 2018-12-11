import BaseService from "./base.service";
import api from "./api.service"

class CrudService extends BaseService {

    constructor(url) {
        super(url);
    }
    /** request for all records */
    getList() {
        return api.get(this.URL, this.getHeaders())
    }
    /** request for a record by Id */
    get(id) {
        return api
            .get(this.URL + "/" + id, this.getHeaders())
    }
    /** request for save a new record */
    add(obj) {
        return api
            .post(this.URL, obj, this.getHeaders())
    }
    /** reques for update a record */
    update(obj) {
        return api
            .put(this.URL + "/" + obj._id, obj, this.getHeaders())
    }



}

export default CrudService;