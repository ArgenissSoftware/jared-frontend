import config from "../config";

class BaseService {

  constructor(url) {
    this.URL = config.apiHost + url;
  }
}


export default BaseService;