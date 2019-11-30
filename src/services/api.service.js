import axios from "axios";

class ApiService {
  token = '';
  authStore = null;

  setAuthStore = (store) => {
    this.authStore = store;
  }

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

  async get(url) {
    try {
      return await axios.get(url, this.getHeaders());
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.authStore.clearAuth();
      }
      throw error;
    }
  }

  async post(url, obj) {
    try {
      return axios.post(url, obj, this.getHeaders());
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.authStore.clearAuth();
      }
      throw error;
    }
  }

  put(url, obj) {
    try {
      return axios.put(url, obj, this.getHeaders());
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.authStore.clearAuth();
      }
      throw error;
    }
  }

  delete(url) {
    try {
      return axios.delete(url, this.getHeaders());
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.authStore.clearAuth();
      }
      throw error;
    }
  }

}

const api = new ApiService();
export default api;