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
  async addBulkArtists(artistsArray) {
    try {
      // Collect incoming names
      const incomingNames = artistsArray.map((a) => a.artist_name).filter(Boolean);

      // Find existing artists with those names
      const existing = await Artists.findAll({
        where: { artist_name: incomingNames },
        attributes: ['artist_name'],
        raw: true,
      });

      const existingNameSet = new Set(existing.map((e) => e.artist_name));

      // Partition into duplicates and to-create
      const duplicates = [];
      const toCreate = [];
      for (const artist of artistsArray) {
        if (!artist.artist_name) continue;
        if (existingNameSet.has(artist.artist_name)) {
          duplicates.push(artist.artist_name);
        } else {
          toCreate.push({
            artist_id: uuidv4(),
            artist_name: artist.artist_name,
            // artist_label: artist.artist_label,
            artist_debut: artist.artist_debut,
            // artist_type: artist.artist_type,
            artist_member_number: artist.artist_member_number,
            created_at: new Date(),
          });
        }
      }

      let newArtists = [];
      if (toCreate.length > 0) {
        newArtists = await Artists.bulkCreate(toCreate);
      }

      // Return both created records and duplicate names so caller can alert
      return { newArtists, duplicates };
    } catch (error) {
      console.error('Error adding bulk artists:', error);
      throw error;
    }
  }
};

export { artistsService };
