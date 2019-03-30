import CrudService from "./crud.services";
import api from "./api.service";
import Axios from "axios";

class UsersService extends CrudService {

    constructor() {
      super("/users");
    }

    /**
     * request user by email
     *  @param {string} param
     */
    getByEmail(param) {
      return api
        .get(this.URL + "/email/" + param);
    }

    /**
     * github user  request
     * @param {string} githubID
     */
    getGitHubUser(githubID) {
      return Axios
        .get("https://api.github.com/users/" + githubID);
    }

    /**
     * request for register a new record
     */
    add(obj) {
      return api
        .post(this.URL, obj);
    }

    /**
     * disable user
     * @param {string} param
     */
    disable(param){
      return api
        .put(this.URL + "/disable/" + param)
    }

    updatePassword(id ,param) {
      return api.put(this.URL + `/${id}/update_password`, param)
    }
}

const usersService = new UsersService();

export default usersService;