import Controller from "./Controller.js";
import SubFaction from "../models/SubFaction.js";
class SubFactionController extends Controller {
  constructor() {
    super(SubFaction);
  }
}
export default new SubFactionController();
