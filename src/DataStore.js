import {observable} from "mobx"


class DataStore{
    @observable email = ""
    @observable password = ""
    @observable emailRegister = ""
    @observable passwordRegister= ""
    @observable repeatPassword = ""
    
}

let store = new DataStore();

export default store