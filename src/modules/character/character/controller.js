import { characterService } from "./service.js";

const characterController = {
  getAllCharacters: async (req, res) => {
    try {
      const characters = await characterService.getAllCharacters();
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Characters retrieved successfully",
        data: characters,
      });
    } catch (error) {
      console.error("Error fetching characters:", error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to retrieve characters",
        data: [],
      });

    }
  },
  getCharacterById: async (req, res) => {
    try {
      const { id } = req.params;
      const character = await characterService.getCharacterById(id);
      if (!character) {
        return res.sendResponse({
          code: 400,
          status: "error",
          message: "Character not found",
          data: null,
        });
      }
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Character retrieved successfully",
        data: character,
      })
    }
    catch (error) {
      console.error(`Error fetching character with id ${id}:`, error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to retrieve character",
        data: null,
      });
    }
  },
  addBulkCharacter: async (req, res) => {
    try {
      const characterData = req.body;
      const newCharacters = await characterService.addBulkCharacter(characterData);
      return res.sendResponse({
        code: 201,
        status: "success",
        message: "Characters created successfully",
        data: newCharacters,
      });
    } catch (error) {
      console.error("Error creating characters:", error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: "Failed to create characters",
        data: [],
      });
    }
  }
}

export { characterController };