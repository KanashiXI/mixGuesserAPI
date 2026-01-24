import { songModel } from "../models/song.model.js";

const songController = {
  getSongs: async (req, res) => {
    try {
      const songs = await songModel.getAllSongs();
      res.status(200).json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export { songController };
