import Sequelize from "sequelize";
import CharactersModel from "../../../models/character/charactersModel.js";

const characterService = {
  async getAllCharacters() {
    try {
      const characters = await CharactersModel.findAll({
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
            element: char.element,
            star: char.star,
          })
        } else {
          existingCharacters.push(char.char_name);
        }
      }

      let newCharacterNames = [];
      if (newCharacters.length > 0) {
        newCharacterNames = await CharactersModel.bulkCreate(newCharacters);
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
  },
  async editCharacter(id, characterData) {
    try {
      const character = await CharactersModel.findByPk(id);
      if (!character) {
        throw new Error("Character not found");
      }
      await character.update(characterData);
      return character;
    }
    catch (error) {
      console.error(`Error updating character with id ${id}:`, error);
      throw error;
    }
  },
  async deleteCharacter(id) {
    try {
      const character = await CharactersModel.findByPk(id);
      if (!character) {
        throw new Error("Character not found");
      }
      await character.destroy();
      return character;
    }
    catch (error) {
      console.error(`Error deleting character with id ${id}:`, error);
      throw error;
    }
  },
  async searchCharactersByName(name) {
    try {
      if (!name || name.trim() === "") {
        throw new Error("Search at least one character");
      }

      const characters = await CharactersModel.findAll({
        where: {
          char_name: {
            [Sequelize.Op.like]: `%${name}%`
          }
        },
        attributes: [
          "char_id",
          "char_name",
        ],
        limit: 5,
        order: [['char_name', 'ASC']],
        raw: true,
      });
      return characters;
    } catch (error) {
      console.error(`Error searching characters by name ${name}:`, error);
      throw error;
    }
  }
}

export { characterService };