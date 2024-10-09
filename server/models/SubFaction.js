import Model from "./Model.js";
class SubFaction extends Model {
  static tablename = "subfaction";

  constructor(data) {
    super(data);
    this.validate();
  }

  static fields = {
    name: "text",
    faction_id: "integer",
  };
}
export default SubFaction;
