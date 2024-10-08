import Model from "./Model";
class Faccion extends Model {
  static tablename = "faccion";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    nombre: "tsext",
  };
}
export default Faccion;
