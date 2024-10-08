import Model from "./Model";
class SubFaccion extends Model {
  static tablename = "subfaccion";

  constructor(data) {
    super(data);
    this.validate();
  }

  static fields = {
    nombre: "text",
    faccion_id: "integer",
  };
}
export default SubFaccion;
