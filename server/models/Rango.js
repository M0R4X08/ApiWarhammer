import Model from "./Model.js";

class Rango extends Model {
  static tablename = "rango";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    nombre: "text",
  };
}

export default Rango;
