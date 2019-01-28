import { decorate, action, observable } from "mobx";
import rolesService from "../services/roles.service";

class RolesStore {
  roles = [];
  async getRolesList(pageNum, pageSize) {
    try {
      const response = await rolesService.getList(pageNum, pageSize);
      this.roles = response.data.data.list;
    } catch (err) {
      console.error(err);
    }
  }
}

decorate(RolesStore, {
  roles: observable,
  getRolesList: action,
})

let rolesStore = new RolesStore();

export default rolesStore;
