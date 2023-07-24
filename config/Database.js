import { Sequelize } from "sequelize";

const db = new Sequelize("remusix", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
