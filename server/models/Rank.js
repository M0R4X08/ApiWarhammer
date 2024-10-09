import Model from "./Model.js";

class Rank extends Model {
  static tablename = "rank";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    name: "text",
  };
}

export default Rank;
