import Controller from "./Controller.js";
import Alignment from "../models/Alignment.js";

class AlignmentController extends Controller {
  constructor() {
    super(Alignment);
  }
}

export default new AlignmentController();
