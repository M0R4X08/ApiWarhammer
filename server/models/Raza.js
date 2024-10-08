import Model from "./Model";

class Raza extends Model {
  static tablename = "raza";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    nombre: "text",
  };
}
export default Raza;
