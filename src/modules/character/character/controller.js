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
  }
}

export { characterController };