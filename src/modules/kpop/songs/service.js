import { v4 as uuidv4 } from "uuid";
import Songs from "../../../models/songsModel.js";

const songsService = {
  // Get all songs
  async getAllSongs() {
    try {
      const songs = await Songs.findAll({
        attributes: [
          "song_id",
          "song_name",
          "song_album",
          "song_release_year",
          "song_length",
          "is_guess",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
        raw: true,
        order: [["created_at", "DESC"]],
      });
      return songs;
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw error;
    }
  },

  // Get a single song by ID
  async getSongById(song_id) {
    try {
      const song = await Songs.findByPk(song_id, {
        attributes: [
          "song_id",
          "song_name",
          "song_album",
          "song_release_year",
          "song_length",
          "is_guess",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
        raw: true,
      });
      return song;
    } catch (error) {
      console.error("Error fetching song:", error);
      throw error;
    }
  },

  // Create a new song
  async addSong(songData) {
    try {
      const { song_name, song_album, song_release_year, song_length, song_artist, is_guess } =
        songData;
      const song_id = uuidv4();

      const newSong = await Songs.create({
        song_id,
        song_name,
        song_album,
        song_release_year,
        song_length,
        song_artist,
        is_guess,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return newSong.toJSON();
    } catch (error) {
      console.error("Error adding song:", error);
      throw error;
    }
  },

  // Update a song
  async updateSong(song_id, songData) {
    try {
      const song = await Songs.findByPk(song_id);
      if (!song) {
        throw new Error("Song not found");
      }

      await song.update(songData);
      return song.toJSON();
    } catch (error) {
      console.error("Error updating song:", error);
      throw error;
    }
  },

  // Delete a song
  async deleteSong(song_id) {
    try {
      const song = await Songs.findByPk(song_id);
      if (!song) {
        throw new Error("Song not found");
      }

      await song.destroy();
      return {
        song_id,
        message: "Song deleted successfully",
        deleted_at: song.deleted_at,
      };
    } catch (error) {
      console.error("Error deleting song:", error);
      throw error;
    }
  },

  // Create multiple songs at once
  async addBulkSongs(songsArray) {
    try {
      if (!Array.isArray(songsArray) || songsArray.length === 0) {
        throw new Error("Invalid input: expected an array of songs");
      }

      const incomingNames = songsArray.map((songs) => songs.song_name).filter(Boolean);

      console.log("Incoming song names:", incomingNames);

      const existing = await Songs.findAll({
        where: { song_name: incomingNames },
        attributes: ["song_name"],
        raw: true,
      });

      const existingNameSet = new Set(existing.map((songs) => songs.song_name));
      
      const duplicates = [];
      const toCreate = [];
      for (const song of songsArray) {
        if (!song.song_name) continue;
        if (existingNameSet.has(song.song_name)) {
          duplicates.push(song.song_name);
        } else {
          toCreate.push({
            song_id: uuidv4(),
            song_name: song.song_name,
            song_album: song.song_album,
            song_release_year: song.song_release_year,
            song_length: song.song_length,
            song_artist: song.song_artist,
            is_guess: song.is_guess || 0,
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }

      let newSongs = [];
      if (toCreate.length > 0) {
        newSongs = await Songs.bulkCreate(toCreate);
      }

      return {newSongs, duplicates};
    } catch (error) {
      console.error("Error adding bulk songs:", error);
      throw error;
    }
  },
};

export { songsService };
