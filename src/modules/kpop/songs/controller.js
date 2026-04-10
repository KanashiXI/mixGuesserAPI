import { songsService } from "./service.js";

const songsController = {
  getAllSongs: async (req, res) => {
    try {
      const songs = await songsService.getAllSongs();
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Songs retrieved successfully",
        data: songs,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },

  getSongById: async (req, res) => {
    try {
      const { id } = req.params;
      const song = await songsService.getSongById(id);
      if (!song) {
        return res.sendResponse({
          code: 404,
          status: "error",
          message: "Song not found",
        });
      }
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Song retrieved successfully",
        data: song,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },

  addSong: async (req, res) => {
    try {
      const newSong = await songsService.addSong(req.body);
      return res.sendResponse({
        code: 201,
        status: "success",
        message: "Song created successfully",
        data: newSong,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },

  updateSong: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSong = await songsService.updateSong(id, req.body);
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Song updated successfully",
        data: updatedSong,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },

  deleteSong: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await songsService.deleteSong(id);
      return res.sendResponse({
        code: 200,
        status: "success",
        message: "Song deleted successfully",
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },

  addBulkSongs: async (req, res) => {
    try {
      const songs = await songsService.addBulkSongs(req.body);
      return res.sendResponse({
        code: 201,
        status: "success",
        message: `${songs?.newSongs.length} songs created successfully`,
        data: songs,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: "error",
        message: error.message || "Internal Server Error",
      });
    }
  },
};

export { songsController };
