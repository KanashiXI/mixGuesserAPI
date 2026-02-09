import Artists from '../../models/artistsModel.js';
import { v4 as uuidv4 } from 'uuid';

const artistsService = {
  async getAllArtists() {
    try {
      const artists = await Artists.findAll({
        attributes: [
          'artist_id',
          'artist_name',
          'artist_label',
          'artist_debut',
          'created_at',
          'updated_at',
          'deleted_at',
        ],
        raw: true,
        order: [['created_at', 'DESC']],
      });
      return artists;
    } catch (error) {
      console.error('Error fetching artists:', error);
      throw error;
    }
  },
  async addArtist(artistData) {
    try {
      const { artist_name, artist_label, artist_debut } = artistData;
      const artist_id = uuidv4();
      const newArtist = await Artists.create({
        artist_id,
        artist_name,
        artist_label ,
        artist_debut,
      });
      return newArtist;
    } catch (error) {
      console.error('Error adding artist:', error);
      throw error;
    }
  },
};

export { artistsService };
