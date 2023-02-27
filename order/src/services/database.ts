import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_TABLE!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
