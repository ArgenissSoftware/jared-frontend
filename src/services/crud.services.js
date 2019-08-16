import BaseService from "./base.service";
import api from "./api.service"

class CrudService extends BaseService {

  constructor(url) {
    super(url);
  }
  /** request for all records */
  getList(pageNum, pageSize, search) {
    let endpoint = `${this.URL}/page/${pageNum}/size/${pageSize}`;
    if (search) endpoint += `?search=${search}`;
    return api.get(endpoint);
  }
  /** request for a record by Id */
  get(id) {
    return api.get(this.URL + "/" + id);
  }
  /** request for save a new record */
  add(obj) {
    return api.post(this.URL, obj);
  }
  /** request for update a record */
  update(obj) {
    return api.put(this.URL + "/" + obj._id, obj);
  }

  remove(id) {
    return api.delete(this.URL + "/" + id);
  }
  /** request for add a new relation */
  addRelation(firstId, secondId, param){
    const endpoint = "/" + firstId + param + secondId;
    return api.post(this.URL + endpoint);
  }
  /** request for delete a relation */
  removeRelation(firstId, secondId, param){
    const endpoint = "/" + firstId + param + secondId;
    return api.delete(this.URL + endpoint);
  }
}

export default CrudService;