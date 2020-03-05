import api from "./api.service";
import BaseService from './base.service';

class WorkedHoursService extends BaseService {

  constructor() {
    super("/workedHours");
  }

  addHours(reg) {
    return api
      .post(this.URL, reg);
  }

  getHours(userId, clientId, year, month) {
    return api
      .get(`${this.URL}/user/${userId}/client/${clientId}/year/${year}/month/${month}`);
  }

}

const workedHoursService = new WorkedHoursService();

export default workedHoursService;
