import Controller from "./Controller.js";
import Rank from "../models/Rank.js";
class RankController extends Controller {
  constructor() {
    super(Rank);
  }
}
export default new RankController();
