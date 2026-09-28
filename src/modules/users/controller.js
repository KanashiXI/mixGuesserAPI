import { playerService } from './service.js';

const playerController = {
  getAllPlayers: async (req, res) => {
    try {
      const { pageIndex, pageSize } = req.body;
      if (!pageIndex || !pageSize) {
        return res.sendResponse({
          code: 400,
          status: 'error',
          message: 'pageIndex and pageSize are required',
          data: [],
        });
      }
      const players = await playerService.getAllPlayers({ pageIndex, pageSize });
      return res.sendResponse({
        code: 200,
        status: 'success',
        message: 'Players retrieved successfully',
        data: players,
      });
    } catch (error) {
      return res.sendResponse({
        code: 500,
        status: 'error',
        message: 'Internal server error',
        data: [],
      });
    }
  },
  getPlayerById: async (req, res) => {
    try {
      const { id } = req.params;
      const player = await playerService.getPlayerById(id);
      if (!player) {
        return res.sendResponse({
          code: 404,
          status: 'error',
          message: 'Player not found',
          data: [],
        });
      }
      return res.sendResponse({
        code: 200,
        status: 'success',
        message: 'Player retrieved successfully',
        data: player,
      });
    } catch (error) {
      return res.sendResponse({
        code: 500,
        status: 'error',
        message: 'Internal server error',
        data: [],
      });
    }
  },
  getPlayerTopScores: async (req, res) => {
    try {
      const { limit } = req.query;
      if (!limit) {
        return res.sendResponse({
          code: 400,
          status: 'error',
          message: 'Limit is required',
          data: [],
        });
      }
      const topPlayers = await playerService.getPlayerTopScores(parseInt(limit));
      return res.sendResponse({
        code: 200,
        status: 'success',
        message: 'Top players retrieved successfully',
        data: topPlayers,
      });
    } catch (error) {
      return res.sendResponse({
        code: 500,
        status: 'error',
        message: 'Internal server error',
        data: [],
      });
    }
  },
  getPlayerByDisplayName: async (req, res) => {
    try {
      const { displayName } = req.params;
      const player = await playerService.getPlayerByDisplayName(displayName);
      if (!player) {
        return res.sendResponse({
          code: 404,
          status: 'error',
          message: 'Player not found',
          data: [],
        });
      }
      else if (player.length === 0) {
        return res.sendResponse({
          code: 200,
          status: 'success',
          message: 'Player not found',
          data: [],
        });
      }
      return res.sendResponse({
        code: 200,
        status: 'success',
        message: 'Player retrieved successfully',
        data: player,
      });
    } catch (error) {
      return res.sendResponse({
        code: 500,
        status: 'error',
        message: 'Internal server error',
        data: [],
      });
    }
  },

}

export default playerController;