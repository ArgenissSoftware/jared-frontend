import axios from "axios";
import {useAuthStore} from "../stores/AuthStore";

class ApiService {
  token = '';

  setToken(value) {
    this.token = value
  }

  getHeaders() {
    return {
      headers: {
        "Authorization": "Bearer " + this.token,
        "Content-Type": "application/json"
      }
    }
  }

  get(url){
    return axios.get(url, this.getHeaders());
  }

  post(url, obj){
    return axios.post(url, obj, this.getHeaders());
  }

  put(url, obj){
    return axios.put(url, obj, this.getHeaders());
  }

  delete(url){
    return axios.delete(url, this.getHeaders());
  }

}

const api = new ApiService();
export default api;