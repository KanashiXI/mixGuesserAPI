import Sequelize from 'sequelize';
import Users from '../../models/users/usersModel.js';

const playerService = {
  async getAllPlayers(body) {
    try {
      const { pageIndex, pageSize } = body;
      if(!pageIndex || !pageSize) {
        throw new Error('pageIndex and pageSize are required');
      }
      const offset = (pageIndex - 1) * pageSize;
      const limit = pageSize;

      const { count, rows } = await Users.findAndCountAll({
        attributes: [
          'uuid',
          'display_name',
        ],
        offset,
        limit,
        order: [['display_name', 'ASC']],
      })
      
      return {
        totalCount: count,
        characters: rows,
      };
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error;
    }
  },
  async getPlayerById(id) {
    try {
      const player = await Users.findOne({
        where: { uuid: id },
        attributes: [
          'uuid',
          'display_name',
          'email',
          'total_score',
        ],
      });
      return player;
    } catch (error) {
      console.error('Error fetching player by ID:', error);
      throw error;
    }
  },
  async getPlayerTopScores(limit) {
    try {
      const topPlayers = await Users.findAll({
        attributes: [
          'uuid',
          'display_name',
          'total_score',
        ],
        order: [['total_score', 'DESC']],
        limit,
      });
      return topPlayers;
    } catch (error) {
      console.error('Error fetching top players:', error);
      throw error;
    }
  },
  async searchPlayersByName(name) {
    try {
      const players = await Users.findAll({
        where: {
          display_name: {
            [Sequelize.Op.like]: `%${name}%`,
          },
        },
        attributes: [
          'uuid',
          'display_name',
          'total_score',
        ],
        order: [['display_name', 'ASC']],
        limit: 5,
      });
      return players;
    } catch (error) {
      console.error('Error searching players by name:', error);
      throw error;
    }
  }
};

export default playerService;