import { decorate, action, observable } from "mobx";
import rolesService from "../services/roles.service";
import CrudStore from "./CrudStore";

class RolesStore extends CrudStore {
  constructor(){
    super(rolesService)
  }
  roles = [];
  async getList(pageNum, pageSize) {
    const response = await super.getList(pageNum, pageSize);
    this.roles = response.data.data.list;
  }
}

decorate(RolesStore, {
  roles: observable,
  getList: action,
})

let rolesStore = new RolesStore();

export default rolesStore;
