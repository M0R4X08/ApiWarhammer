import Controller from "./Controller.js";
import Characters from "../models/Characters.js";
import Paginator from "../utils/Paginator.js";

class CharacterController extends Controller {
  constructor() {
    super(Characters);
  }

  findAllCharacters = async (req, res) => {
    const paginator = new Paginator(Characters);
    const { page, limit, offset, totalData, totalPages } =
      await paginator.paginateData(req.query.page, req.query.limit);

    try {
      const characters = await Characters.findAllCharacters(limit, offset);
      return res.status(200).json({
        totalData: totalData,
        totalPages: totalPages,
        currentPage: page,
        data: characters,
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

  findByIdCharacter = async (req, res) => {
    try {
      const character = await Characters.findByIdCharacter(req.params.id);
      if (!character) {
        return res.status(404).json({
          errors: [
            {
              status: 404,
              message: "Character not found",
            },
          ],
        });
      }
      return res.status(200).json({ data: character });
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

export default new CharacterController();
