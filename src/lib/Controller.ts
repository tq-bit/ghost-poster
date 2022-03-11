import Ghoster from './Ghoster';

export default class Controller {
  ghoster: Ghoster;
  constructor(ghoster: Ghoster) {
    this.ghoster = ghoster;
  }

  getGhoster() {
    return this.ghoster
  }
}
