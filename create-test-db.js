const pg = require("pg");
const dotenv = require("dotenv");
const { join } = require("path");

dotenv.config({ path: join(process.cwd(), ".env.test") });

const createTestDB = async () => {
  const client = new pg.Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: "postgres",
  });

  await client.connect();

  await client.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE_NAME};`);
  await client.query(`CREATE DATABASE ${process.env.DATABASE_NAME};`);

  await client.end();
};

createTestDB();
