import axios from "axios";
import AppStore from "../stores/AppStore";
import authStore from "../stores/AuthStore";

export function getList(endpoint){
    return axios.get(AppStore.URL + endpoint, {
        headers: {
            Authorization: "Bearer"+ authStore.token
        }
    })
}

export function getOne(endpoint){
    return axios.get(AppStore.URL + endpoint, {
        headers: {
            Authorization: "Bearer"+ authStore.token
        }
    })
}

export function postOne(endpoint, data){
    return axios.post(AppStore.URL + endpoint, data )
}

export function postOneAuth(endpoint, obj){
    return axios.post(AppStore.URL + endpoint, obj, {
        headers: {
          Authorization: "Bearer " + authStore.token
        }
      })
}

export function updateOne(endpoint, data){
    return axios.put(AppStore.URL + endpoint, data,{
        headers: {
            Authorization: "Bearer " + authStore.token
        }
    })
}

export function deleteOne(endpoint){
    return axios.delete(AppStore.URL + endpoint, {
        headers: {
            Authorization: "Bearer"+ authStore.token
        }
    })
}

