import axios from "axios";
import CrudService from "./crud.services";

class UsersService extends CrudService {

    constructor() {
        super("/users/");
    }

    getByEmail(param) {
        return axios
            .get(this.URL + "?email=" + param, this.headers)
    }

    getGitHubUser(githubID) {
        return axios
            .get("https://api.github.com/users/" + githubID);
    }

}

const usersService = new UsersService();

export default usersService;