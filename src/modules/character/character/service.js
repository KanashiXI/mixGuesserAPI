import Characters from "../../../models/character/charactersModel.js";

const characterService = {
  async getAllCharacters() {
    try {
      const characters = await Characters.findAll({
        attributes: [
          "char_id",
          "char_name",
          "sex",
          "team",
          "weapon",
        ],
        raw: true,
        order: [["created_at", "DESC"]],
      });
      return characters;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }
}

export { characterService };