import BaseService from "./base.service";
import api from "./api.service"

class CrudService extends BaseService {

    constructor(url) {
        super(url);
    }
    /** request for all records */
    getList() {
        return api.get(this.URL)
    }
    /** request for a record by Id */
    get(id) {
        return api
            .get(this.URL + "/" + id)
    }
    /** request for save a new record */
    add(obj) {
        return api
            .post(this.URL, obj)
    }
    /** reques for update a record */
    update(obj) {
        return api
            .put(this.URL + "/" + obj._id, obj)
    }



}

export default CrudService;