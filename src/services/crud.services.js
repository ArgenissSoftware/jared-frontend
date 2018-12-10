import BaseService from "./base.service";

class CrudService extends BaseService {

    constructor(url) {
        super(url);
    }
    /** request for all records */
    getList() {
        return this.getAll(this.getHeaders())
    }
    /** request for a record by Id */
    get(id) {
        return this.getOne(id, this.getHeaders())
    }
    /** request for save a new record */
    add(obj) {
        return this.postOne("", obj, this.getHeaders())
    }
    /** reques for update a record */
    update(obj) {
        return this.updateOne(obj._id, obj, this.getHeaders())
    }



}

export default CrudService;