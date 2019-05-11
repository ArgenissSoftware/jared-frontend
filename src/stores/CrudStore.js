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
    try {
      return await this.service.get(id);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Get all records
   * @param {*} pageNum 
   * @param {*} pageSize 
   * @param {*} search 
   */
  async getList(pageNum, pageSize, search) {
    try {
      return await this.service.getList(pageNum, pageSize, search);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Remove record by ID
   * @param {*} id 
   */
  async remove(id){
    try {
      return await this.service.remove(id);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Add record to DB
   * @param {*} obj 
   */  
  async add(obj) {
    try {
      return await this.service.add(obj);
    } catch (err) {
      console.error(err);
    }
  }
  
  /**
   * Update record data
   * @param {*} obj 
   */
  async update(obj) {
    try {
      return await this.service.update(obj);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Create a relation between entities
   * @param {*} firstEntity 
   * @param {*} secondEntity 
   * @param {*} endpoint 
   * @param {*} listReference 
   */
  async addRelation(firstEntity, secondEntity, endpoint, listReference){
    try {
      if (!secondEntity) {
        console.error("Entity to add is undefined");
        return;
      }
      listReference.push(secondEntity);
      return await this.service.removeRelation(firstEntity._id, secondEntity._id, endpoint);
    } catch (err) {
      _.remove(listReference, (u) => u._id === secondEntity._id  );
      console.error(err);
    }
  }

  /**
   * Remove a relation between entities
   * @param {*} firstEntity 
   * @param {*} secondEntity 
   * @param {*} endpoint 
   * @param {*} listReference 
   */
  async removeRelation(firstEntity, secondEntity, endpoint, listReference) {
    try {
      if (!secondEntity)  {
        console.error("Entity to remove is undefined");
        return;
      }
      _.remove(listReference, (u) => u._id === secondEntity._id );
      return await this.service.removeRelation(firstEntity._id, secondEntity._id, endpoint);
    } catch(err) {
      listReference.push(secondEntity);
      console.error(err);
    }
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