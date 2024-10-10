import Model from "./Model.js";
import db from "../database/db-client.js";

class Characters extends Model {
  static tablename = "characters";
  constructor(data) {
    super(data);
    this.validate();
  }
  static fields = {
    name: "text",
    race_id: "integer",
    faction_id: "integer",
    subfaction_id: "integer",
    rank_id: "integer",
    alignment_id: "integer",
    home_planet: "text",
    special_abilities: "text",
    main_weapons: "text",
    armor: "text",
    vehicle: "text",
    history: "text",
    significant_battles: "text",
    relationships: "text",
    main_achievements: "text",
    creation_date: "text",
    age: "text",
    additional_notes: "text",
    image: "text",
  };

  static builderQueryById() {
    return `  
      SELECT  
        c.*,
        ra.name AS race_name,
        f.name AS faction_name,
        s.name AS subfaction_name,
        al.name AS alignment_name,
        r.name AS rank_name
      FROM 
        characters c
      LEFT JOIN 
        race ra  ON c.race_id = ra.id  
      LEFT JOIN 
        faction f  ON c.faction_id = f.id
      LEFT JOIN 
        subfaction s ON c.subfaction_id = s.id
      LEFT JOIN 
        alignment al ON c.alignment_id = al.id
      LEFT JOIN 
        rank r ON c.rank_id = r.id
      WHERE c.id = ?;`;
  }

  static builderQueryAll() {
    return `
      SELECT  
        c.*,
        ra.name AS race_name,
        f.name AS faction_name,
        s.name AS subfaction_name,
        al.name AS alignment_name,
        r.name AS rank_name
      FROM 
        characters c
      LEFT JOIN 
        race ra  ON c.race_id = ra.id  
      LEFT JOIN 
        faction f  ON c.faction_id = f.id
      LEFT JOIN 
        subfaction s ON c.subfaction_id = s.id
      LEFT JOIN 
        alignment al ON c.alignment_id = al.id
      LEFT JOIN 
        rank r ON c.rank_id = r.id LIMIT ? OFFSET ?;`;
  }

  static formatCharacter(character) {
    return {
      id: character.id,
      name: character.name,
      race: {
        id: character.race_id,
        name: character.race_name,
      },
      faction: {
        id: character.faction_id,
        name: character.faction_name,
      },
      subfaction: {
        id: character.subfaction_id,
        name: character.subfaction_name,
      },
      rank: {
        id: character.rank_id,
        name: character.rank_name,
      },
      alignment: {
        id: character.alignment_id,
        name: character.alignment_name,
      },
      home_planet: character.home_planet,
      special_abilities: character.special_abilities,
      main_weapons: character.main_weapons,
      armor: character.armor,
      vehicle: character.vehicle,
      history: character.history,
      significant_battles: character.significant_battles,
      relationships: character.relationships,
      main_achievements: character.main_achievements,
      creation_date: character.creation_date,
      age: character.age,
      additional_notes: character.additional_notes,
      image: character.image,
    };
  }

  static async findAllCharacters(limit, offset) {
    try {
      const query = this.builderQueryAll();

      const result = await db.execute(query, [limit, offset]);
      return result.rows.map(this.formatCharacter);
    } catch (e) {
      console.error(e);
    }
  }

  static async findByIdCharacter(id) {
    try {
      const query = this.builderQueryById();
      const result = await db.execute(query, [id]);
      return result.rows.map(this.formatCharacter);
    } catch (e) {
      console.error(e);
    }
  }
}

export default Characters;
