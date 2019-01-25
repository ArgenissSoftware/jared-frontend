import { decorate, action, observable } from "mobx";
import rolesService from "../services/roles.service";

class RolesStore {
  roles = [];

  async getRolesList() {
    try {
      const response = await rolesService.getList();
      this.roles = response.data.data;
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
