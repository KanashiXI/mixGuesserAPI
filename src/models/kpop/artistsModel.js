import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const Artists = sequelize.define(
  'Artists',
  {
    artist_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artist_debut: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    artist_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    artist_member_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.NOW,
      allowNull: true,
      // defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.NOW,
      allowNull: true,
      // defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.NOW,
      allowNull: true,
      // defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Artists',
    tableName: 'artists',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timezone: 'Asia/Bangkok',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  },
);

export default Artists;
