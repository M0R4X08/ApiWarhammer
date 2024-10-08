import Model from "./Model";

class Personajes extends Model {
  static tablename = "personajes";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    nombre: "text",
    raza_id: "integer",
    faccion_id: "integer",
    subfaccion_id: "integer",
    rango_id: "integer",
    alineacion_id: "integer",
    planeta_origen: "text",
    habilidades_especiales: "text",
    armas_principales: "text",
    armadura: "text",
    vehiculo: "text",
    historia: "text",
    batalla_importantes: "text",
    relaciones: "text",
    logros_principales: "text",
    fecha_creacion: "text",
    edad: "numeric",
    notas_adicionales: "text",
    imagen: "text",
  };
}
export default Personajes;
