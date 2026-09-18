import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Users = sequelize.define(
  "Users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.NOW,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.NOW,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Characters",
    tableName: "characters",
    charset: "utf8mb4",
    collate: "utf8mb4_bin",
    timezone: "Asia/Bangkok",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  },
);

export default Users;