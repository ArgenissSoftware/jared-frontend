import {
  decorate,
  action
} from "mobx";
import _ from 'lodash';

/**
 * CurdStore implement common CRUD tasks
 */
class CrudStore {
  
  constructor(service){
    this.service = service;
  }

  /**
   * Get a Record
   * @param {} id 
   */
  async get(id){
    return await this.service.get(id);
  }

  /**
   * Get all records
   * @param {*} pageNum 
   * @param {*} pageSize 
   * @param {*} search 
   */
  async getList(pageNum, pageSize, search) {
    return await this.service.getList(pageNum, pageSize, search);
  }

  /**
   * Remove record by ID
   * @param {*} id 
   */
  async remove(id){
    return await this.service.remove(id);
  }

  /**
   * Add record to DB
   * @param {*} obj 
   */  
  async add(obj) {
    return await this.service.add(obj);
  }
  
  /**
   * Update record data
   * @param {*} obj 
   */
  async update(obj) {
    return await this.service.update(obj);
  }

  /**
   * Create a relation between entities
   * @param {*} firstEntity 
   * @param {*} secondEntity 
   * @param {*} endpoint 
   * @param {*} listReference 
   */
  async addRelation(firstEntity, secondEntity, endpoint, listReference){
    if (!secondEntity) {
      console.error("Entity to add is undefined");
      return;
    }
    await this.service.removeRelation(firstEntity._id, secondEntity._id, endpoint);
    listReference.push(secondEntity);
    return listReference;
  }

  /**
   * Remove a relation between entities
   * @param {*} firstEntity 
   * @param {*} secondEntity 
   * @param {*} endpoint 
   * @param {*} listReference 
   */
  async removeRelation(firstEntity, secondEntity, endpoint, listReference) {
    if (!secondEntity)  {
      console.error("Entity to remove is undefined");
      return;
    }
    await this.service.removeRelation(firstEntity._id, secondEntity._id, endpoint);
    _.remove(listReference, (u) => u._id === secondEntity._id );
    return listReference;
  }
}

decorate(CrudStore, {
  get: action,
  getList: action,
  add: action,
  update: action,
  remove: action,
  addRelation: action,
  removeRelation: action,
});

export default CrudStore;