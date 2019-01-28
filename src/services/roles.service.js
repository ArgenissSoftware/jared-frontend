import CrudService from "./crud.services";

class RolesService extends CrudService {
  constructor() {
    super("/roles");
  }
}

const rolesService = new RolesService();

export default rolesService;