import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Songs = db.define(
  "songs",
  {
    userid: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    links: {
      type: DataTypes.TEXT,
    },
    added: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default Songs;
