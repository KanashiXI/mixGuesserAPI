import { artistsService } from './service.js';

const artistsController = {
  getAllArtists: async (req, res) => {
    try {
      const artists = await artistsService.getAllArtists();
      return res.sendResponse({
        code: 200,
        status: 'success',
        message: 'Artists retrieved successfully',
        data: artists,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: 'error',
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addArtist: async (req, res) => {
    try {
      const newArtist = await artistsService.addArtist(req.body);
      return res.sendResponse({
        code: 201,
        status: 'success',
        message: 'Artist created successfully',
        data: newArtist,
      });
    } catch (error) {
      console.error(error);
      return res.sendResponse({
        code: 500,
        status: 'error',
        message: error.message || 'Internal Server Error',
      });
    }
  }
};

export { artistsController };