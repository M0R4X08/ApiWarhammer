import Controller from "./Controller.js";
import Faction from "../models/Faction.js";
class FactionController extends Controller {
  constructor() {
    super(Faction);
  }
}
export default new FactionController();
