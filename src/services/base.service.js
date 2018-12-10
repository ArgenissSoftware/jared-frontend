import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";
import axios from "axios";

class BaseService {

    constructor(url) {
        this.URL = AppStore.URL + url;
    }

    /** use to add headers to request */
    getHeaders() {
        return {
            headers: {
                "Authorization": "Bearer " + authStore.token,
                "Content-Type": "application/json"
            }
        }
    }
    /** use to get all the objects of one type */
    getAll(headers){
        return axios.get(this.URL,headers);
    }
    
    /** use to get one object */
    getOne(endpoint, headers){
        return axios.get(this.URL + "/" + endpoint, headers || this.getHeaders());
    }
    
    /** use to post one object */
    postOne(endpoint, param, headers){
        return axios.post(this.URL + endpoint, param, headers);
    }
    
    /** use to put one object */
    updateOne(endpoint, data, headers){
        return axios.put(this.URL + "/" + endpoint, data, headers);
    }
    
    /** use to delete one object */
    deleteOne(endpoint, headers){
        return axios.delete(this.URL + "/" + endpoint, headers);
    }
}


export default BaseService;