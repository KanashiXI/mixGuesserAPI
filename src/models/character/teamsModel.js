import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js'

const CharTeams = sequelize.define(
  'CharTeams',
  {
    char_team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    char_team_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guess_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.NOW,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.NOW,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CharTeams',
    tableName: 'character_team',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timezone: 'Asia/Bangkok',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  }
)

export default CharTeams;