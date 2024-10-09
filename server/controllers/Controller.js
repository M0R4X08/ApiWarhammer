import Paginator from "../utils/Paginator.js";

class Controller {
  constructor(model) {
    this.model = model;
  }

  findAll = async (req, res) => {
    const paginator = new Paginator(this.model);
    const { page, limit, offset, totalData, totalPages } =
      await paginator.paginateData(req.query.page, req.query.limit);

    try {
      const data = await this.model.findAll(limit, offset);
      return res.status(200).json({
        totalData: totalData,
        totalPages: totalPages,
        currentPage: page,
        data: data,
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

  findById = async (req, res) => {
    try {
      const result = await this.model.findById(req.params.id);
      if (!result) {
        return res.status(404).json({
          errors: [
            {
              status: 404,
              message: `${this.model.name} not found`,
            },
          ],
        });
      }
      return res.status(200).json({ data: result });
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

  create = async (req, res) => {
    try {
      const instance = new this.model({ ...req.body });
      const result = await this.model.create(instance.data);
      return res.status(201).json({
        message: `${this.model.name} created successfully`,
        id: result.lastInsertRowid.toString(),
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

  update = async (req, res) => {
    try {
      const data = this.model.findById(req.params.id);
      if (!data) {
        return res.status(404).json({
          errors: [
            {
              status: 404,
              message: `${this.model.name} not found`,
            },
          ],
        });
      }
      const instance = new this.model({ ...req.body });
      await this.model.update(req.params.id, instance.data);
      return res.status(200).json({
        message: `${this.model.name} updated successfully`,
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
}

export default Controller;
