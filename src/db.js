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

const { rows } = await pool.query(`SELECT * FROM columns `);
console.log(rows);

const DB_PATH = new URL("../data.json", import.meta.url).pathname;

export const getDB = async () => {
  let data = await fs.readFile(DB_PATH, "utf-8");
  return data;
};

export const addColumn = async (boardID, name) => {
  try {
    const res = await pool.query(
      `
        INSERT INTO
        columns
        (name, board_id)
        VALUES
        ($1, $2)
        RETURNING
        *
      `,
      [name, boardID],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const addTask = async (column_id, name, description = "") => {
  try {
    const res = await pool.query(
      `
        INSERT INTO
        tasks
        (name, description, column_id)
        VALUES
        ($1, $2, $3)
        RETURNING
        *
        `,
      [name, description, column_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, db);
  return db;
};
