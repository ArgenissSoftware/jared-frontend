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
      oldPassword: "",
      newPassword: "",
      newPassword2: ""
    });
  }

  async getUserData(mail) {
    await axios
      .get(AppStore.URL + "/api/user?email=" + mail)
      .then(
        function(response) {
          this.id = response.data.data[0]._id;
          this.username = response.data.data[0].username;
          this.firstName = response.data.data[0].name || "";
          this.lastName = response.data.data[0].surname || "";
          this.dateOfBirth =
            moment(response.data.data[0].birthday).format("YYYY-MM-DD") || "";
          this.CUIL = response.data.data[0].cuil || "";
          this.passport = response.data.data[0].passport || "";
          this.USVisa =
            moment(response.data.data[0].visa).format("YYYY-MM-DD") || "";
          this.startDate =
            moment(response.data.data[0].startWorkDate).format("YYYY-MM-DD") ||
            "";
          this.status = response.data.data[0].relation || "";
          this.career = response.data.data[0].career || "";
          this.careerStatus = response.data.data[0].status || "";
          this.children = response.data.data[0].childrenCount || "";
          this.alarmCode = response.data.data[0].alarmCode || "";
          this.address = response.data.data[0].address || "";
          this.phoneNumber = response.data.data[0].phone || "";
          this.cellPhone = response.data.data[0].cellphone || "";
          this.email = response.data.data[0].email || "";
          this.skype = response.data.data[0].skype || "";
          this.githubID = response.data.data[0].githubID || "";
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }
}

let profileStore = new ProfileStore();

export default profileStore;
