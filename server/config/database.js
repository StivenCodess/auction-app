import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const POSTGRES_DB = process.env.POSTGRES_DB;
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_HOST = process.env.POSTGRES_HOST;

const CONFIG = {
  host: "localhost",
  dialect: "postgres",
};

const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  CONFIG
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to Postgres has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, connectDB };
