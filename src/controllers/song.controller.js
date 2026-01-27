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
  addSong: async (req, res) => {
    try {
      // console.log("Controller received request to add song with data:", req.body);
      const newSong = await songModel.addSong(req, res);
      res.status(201).json(newSong);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export { songController };
