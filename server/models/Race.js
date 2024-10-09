import Model from "./Model.js";

class Race extends Model {
  static tablename = "race";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    name: "text",
  };
}
export default Race;
