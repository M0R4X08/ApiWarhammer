import Model from "./Model.js";
class Faction extends Model {
  static tablename = "faction";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    name: "text",
  };
}
export default Faction;
