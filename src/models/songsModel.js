import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Songs = sequelize.define("Songs", {
    song_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    song_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    song_album: {
        type: DataTypes.STRING,
        allowNull: true
    },
    song_release_year: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    song_length: {
        type: DataTypes.TIME,
        allowNull: false
    },
    create_at: {
        type: DataTypes.NOW,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },

},{
    sequelize,
    modelName: "Songs",
    tableName: "songs",
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timezone: 'Asia/Bangkok',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
})

export default Songs;