import Rango from "../models/Rango.js";
import Paginator from "../utils/Paginator.js";
export const getAllRangos = async (req, res) => {
  const paginator = new Paginator(Rango);

  const { page, limit, offset, totalData, totalPages } =
    await paginator.paginateData(req.query.page, req.query.limit);

  try {
    const rango = await Rango.findAll(limit, offset);
    return res.status(200).json({
      totalRango: totalData,
      totalPages: totalPages,
      currentPage: page,
      data: rango,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: [
        {
          status: 500,
          message: "Internal server error",
        },
      ],
    });
  }
};
export const getRangoById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Rango.findById(id);
    if (result) {
      return res.status(200).json(result);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: [
        {
          status: 500,
          message: "Internal server error",
        },
      ],
    });
  }
};

export const createRango = async (req, res) => {
  const rangoData = req.body;
  const { nombre } = rangoData;
  //console.log(nombre);
  try {
    const rango = new Rango({ nombre: nombre });
    const result = await Rango.create(rango.data);
    return res.status(201).json({
      message: "Rango created successfully",
      rangoId: result.lastInsertRowid.toString(),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      errors: [
        {
          status: 500,
          message: "Internal server error",
        },
      ],
    });
  }
};
