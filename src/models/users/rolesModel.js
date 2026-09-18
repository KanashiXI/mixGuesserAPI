import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const Roles = sequelize.define(
  'Roles',
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timezone: 'Asia/Bangkok',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

export default Roles;