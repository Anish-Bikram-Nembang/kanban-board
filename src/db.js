import fs from "node:fs/promises";
import pg from "pg";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const DB_PATH = new URL("../data.json", import.meta.url).pathname;

export const getDB = async () => {
  let data = await fs.readFile(DB_PATH, "utf-8");
  return data;
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, db);
  return db;
};
