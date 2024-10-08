import Model from "./Model";

class Alineacion extends Model {
  static tablename = "alineacion";

  constructor(data) {
    super(data);
    this.validate();
  }

  static fields = {
    nombre: "text",
  };
}

export default Alineacion;
