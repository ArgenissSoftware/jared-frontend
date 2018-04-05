import { extendObservable } from "mobx";

class ProfileStore {
  constructor() {
    extendObservable(this, {
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
      githubID: ""
    });
  }
}

let profileStore = new ProfileStore();

export default profileStore;
