import Model from "./Model.js";

class Alignment extends Model {
  static tablename = "alignment";

  constructor(data) {
    super(data);
    this.validate();
  }

  static fields = {
    name: "text",
  };
}

export default Alignment;
