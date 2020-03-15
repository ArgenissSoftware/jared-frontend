import api from "./api.service";
import BaseService from './base.service';

class WorkedHoursService extends BaseService {

  constructor() {
    super("/");
  }

  setHour(userId, clientId, day, hours) {
    return api
      .post(`${this.URL}clients/${clientId}/hours/user/${userId}`, {hours, day});
  }

  getHours(userId, clientId, year, month) {
    return api
      .get(`${this.URL}clients/${clientId}/hours/user/${userId}/year/${year}/month/${month}`);
  }

}

const workedHoursService = new WorkedHoursService();

export default workedHoursService;
