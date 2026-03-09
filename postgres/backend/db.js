import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const {
  DB_HOST = "localhost",
  DB_PORT = 5432,
  DB_USER = "root",
  DB_PASSWORD = "password",
  DB_NAME = "mydatabase",
} = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
})

export default sequelize
