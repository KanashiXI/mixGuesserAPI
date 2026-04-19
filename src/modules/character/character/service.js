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
        order: [["char_id", "ASC"]],
      });
      return characters;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  },
  async getCharacterById(id) {
    try {
      const character = await Characters.findOne({
        where: { char_id: id },
        attributes: [
          "char_id",
          "char_name",
          "sex",
          "team",
          "weapon",
          "model",
          "guess_type"
        ],
        raw: true,
      });
      return character;
    } catch (error) {
      console.error(`Error fetching character with id ${id}:`, error);
      throw error;
    }
  },
  async addBulkCharacter(characterData) {
    try {
      if (!Array.isArray(characterData) || characterData.length === 0) {
        throw new Error("Input atleast one character");
      }

      const incomingNames = characterData.map((char) => char.char_name);
      const allCharacters = await this.getAllCharacters();

      const existingNames = new Set(
        allCharacters.map((char) => char.char_name),
      )
      const newCharacters = [];
      const existingCharacters = [];
      for (const char of characterData) {
        if (!existingNames.has(char.char_name)) {
          newCharacters.push({
            char_name: char.char_name,
            sex: char.sex,
            team: char.team,
            weapon: char.weapon,
            model: char.model,
            guess_type: char.guess_type,
          })
        } else {
          existingCharacters.push(char.char_name);
        }
      }

      let newCharacterNames = [];
      if (newCharacters.length > 0) {
        newCharacterNames = await Characters.bulkCreate(newCharacters);
      }

      return {
        "newCharacters": {
          count: newCharacterNames.length,
          characters: newCharacterNames.map((char) => char.char_name),
        },
        "existingCharacters": {
          count: existingCharacters.length,
          characters: existingCharacters,
        }
      };
    }
    catch (error) {
      console.error("Error creating character:", error);
      throw error;
    }
  }
}

export { characterService };