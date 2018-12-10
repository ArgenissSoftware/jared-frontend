import CrudService from "./crud.services";

class UsersService extends CrudService {

    constructor() {
        super("/users");
    }

    /** request user by email
     *  @param {string} param
    */
    getByEmail(param) {
        return this.getOne("/email/" + param, this.getHeaders());
    }

    /** github user  request
    * @param {string} githubID
    */
    getGitHubUser(githubID) {
        return this.getOne("https://api.github.com/users/" + githubID);
    }

    /** request for register a new record */
    add(obj) {
        return this.postOne(obj, { headers: { "Content-Type": "application/json" } })
    }

}

const usersService = new UsersService();

export default usersService;