require("dotenv").config();

const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    "dist/models/*.js",
    "node_modules/@medusajs/medusa/dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
    "node_modules/@medusajs/medusa/dist/migrations/*.js",
  ],
});

module.exports = {
  datasource: AppDataSource,
};
