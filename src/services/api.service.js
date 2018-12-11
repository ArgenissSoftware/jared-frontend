import axios from "axios";

class ApiService{
    
    constructor() {    }

    get(url, headers){
        return axios.get(url, headers);
    }

    post(url, obj, headers){
        return axios.post(url, obj, headers);
    }

    put(url, obj, headers){
        return axios.put(url, obj, headers);
    }
    
    delete(url, headers){
        return axios.delete(url, headers);
    }

}

const api = new ApiService();
export default api;