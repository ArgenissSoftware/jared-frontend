import { extendObservable } from "mobx";
import axios from "axios";
import AppStore from "./AppStore";
import signInStore from "./SignInStore";
import moment from "moment";

class ProfileStore {
  constructor() {
    extendObservable(this, {
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      CUIL: "",
      passport: "",
      USVisa: "",
      startDate: "",
      status: "",
      career: "",
      careerStatus: "",
      chidren: "",
      alarmCode: "",
      address: "",
      phoneNumber: "",
      cellPhone: "",
      email: "",
      skype: "",
      githubID: "",
      clients: []
    });
  }

  async getUserData(mail) {
    let url = "";
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isMail;

    if (re.test(mail)) {
      url = AppStore.URL + "/api/user?email=" + mail;
      isMail = true;
    } else {
      url = AppStore.URL + "/api/user/" + mail;
      isMail = false;
    }

    await axios
      .get(url)
      .then(
        function(response) {
          let res;

          if (isMail) {
            res = response.data.data[0];
          } else {
            res = response.data.data;
          }

          this.id = res._id;
          this.username = res.username;
          this.firstName = res.name || "";
          this.lastName = res.surname || "";
          this.dateOfBirth = moment(res.birthday).format("YYYY-MM-DD") || "";
          this.CUIL = res.cuil || "";
          this.passport = res.passport || "";
          this.USVisa = moment(res.visa).format("YYYY-MM-DD") || "";
          this.startDate = moment(res.startWorkDate).format("YYYY-MM-DD") || "";
          this.status = res.relation || "";
          this.career = res.career || "";
          this.careerStatus = res.status || "";
          this.children = res.childrenCount || "";
          this.alarmCode = res.alarmCode || "";
          this.address = res.address || "";
          this.phoneNumber = res.phone || "";
          this.cellPhone = res.cellphone || "";
          this.email = res.email || "";
          this.skype = res.skype || "";
          this.githubID = res.githubID || "";
          this.clients = res.clients || [];
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }
}

let profileStore = new ProfileStore();

export default profileStore;
