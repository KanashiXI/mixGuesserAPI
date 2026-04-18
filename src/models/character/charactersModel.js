import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Characters = sequelize.define(
  'Characters',
  {
    char_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    char_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weapon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: 'Characters',
    tableName: 'characters',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timezone: 'Asia/Bangkok',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  }
)

export default Characters;