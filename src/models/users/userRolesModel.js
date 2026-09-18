import { DataTypes} from "sequelize";
import { sequelize } from "../../config/database.js";

const UserRoles = sequelize.define(
  'UserRoles',
  {
    user_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserRoles',
    tableName: 'user_roles',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timezone: 'Asia/Bangkok',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  }
)

export default UserRoles;