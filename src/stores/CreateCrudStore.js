// @flow
import _ from 'lodash';
import { runInAction } from 'mobx';

/**
 * Create crud service
 * @param {CrudService} service
 */
export function createCrudStore(service, defaultEntity = {}) {
  return () => ({
    entity: defaultEntity,
    loading: false,
    running: false,
    errorObj: null,

    setError(error) {
      this.errorObj = error;
    },

    clearEntity() {
      this.entity = defaultEntity;
    },

    toggleActive() {
      this.entity.active = !this.entity.active
    },

    setEntityFromEvent(e, data) {
      this.setEntityProperty(data.name, data.value);
    },

    setEntityProperty(name, value) {
      this.entity[name] = value;
    },

    setRunning(value) {
      this.running = value;
    },

    get fieldsWithErrors() {
      if (!this.errorObj || !this.errorObj.errors) return {};
      const errors = {};
      this.errorObj.errors.forEach(e => errors[e.path[0]] = true);
      return errors;
    },

    /**
     * Get a Record
     * @param {string} id
     */
    async get(id) {
      this.loading = true;
      const response = await service.get(id);
      if (response) {
        runInAction(() => {
          this.entity = response.data.data;
          this.loading = false;
        })
      }
    },

    /**
     * Remove record by ID
     * @param {*} id
     */
    async remove(id) {
      if (!id) id = this.entity._id;
      return await service.remove(id);
    },

    /**
     * Add record to DB
     */
    async add() {
      return await service.add(this.entity);
    },

    /**
     * Update record data
     */
    async update() {
      return await service.update(this.entity);
    },

    /**
     * Save data
     */
    async save() {
      try {
        this.setRunning(true);
        if (this.entity._id) {
          return await service.update(this.entity);
        } else {
          return await service.add(this.entity);
        }
      } catch (error) {
        this.setError(error.response.data);
        return false;
      } finally {
        this.setRunning(false);
      }
    },

    /**
     * Create a relation between entities
     * @param {*} secondEntity
     * @param {*} endpoint
     * @param {*} fieldName
     */
    async addRelation(secondEntity, endpoint, fieldName) {
      if(!secondEntity) {
        console.error("Entity to add is undefined");
        return;
      }
      await service.addRelation(this.entity._id, secondEntity._id, endpoint);
      runInAction(() => {
        this.entity[fieldName].push(secondEntity);
      });
      return this.entity[fieldName];
    },

    /**
     * Remove a relation between entities
     * @param {*} secondEntity
     * @param {*} endpoint
     * @param {*} fieldName
     */
    async removeRelation(secondEntity, endpoint, fieldName) {
      if (!secondEntity)  {
        console.error("Entity to remove is undefined");
        return;
      }
      await service.removeRelation(this.entity._id, secondEntity._id, endpoint);
      runInAction(() => {
        _.remove(this.entity[fieldName], (u) => u._id === secondEntity._id );
      })
      return this.entity[fieldName];
    }
  });
}