import Controller from "./Controller.js";
import Race from "../models/Race.js";

class RaceController extends Controller {
  constructor() {
    super(Race);
  }
}

export default new RaceController();
