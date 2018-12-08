import axios from "axios";
import CrudService from "./crud.services";

class UsersService extends CrudService {

    constructor() {
        super("/users");
    }

    /** request user by email
     *  @param {string} param
    */
    getByEmail(param) {
        return axios
            .get(this.URL + "/email/" + param, this.getHeaders());
    }

    /** github user  request
    * @param {string} githubID
    */
    getGitHubUser(githubID) {
        return axios
            .get("https://api.github.com/users/" + githubID);
    }

    /** request for register a new record */
    add(obj) {
        return axios
            .post(this.URL, obj, { headers: { "Content-Type": "application/json" } });
    }

}

const usersService = new UsersService();

export default usersService;