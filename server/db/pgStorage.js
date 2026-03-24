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

export const removeBoard = async (id) => {
  try {
    const res = await pool.query(
      `
      DELETE FROM 
      boards
      WHERE
      id = $1
      RETURNING
      *
      `,
      [id],
    );
    return res.rows[0];
  } catch (err) {
    console.err(err);
    throw err;
  }
};
export const addBoard = async (user_id, name) => {
  try {
    const res = await pool.query(
      `
      INSERT INTO
      boards
      (user_id, name)
      VALUES
      ($1, $2)
      RETURNING
      *
      `,
      [user_id, name],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const renameBoard = async (id, newName) => {
  try {
    const res = pool.query(
      `
      UPDATE
      boards
      SET 
      name = $1
      WHERE
      id = $2
      RETURNING
      *
      `,
      [newName, id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
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
export const removeColumn = async (id) => {
  try {
    const res = await pool.query(
      `
      DELETE FROM 
      columns
      WHERE
      id = $1
      RETURNING
      *
      `,
      [id],
    );
    return res.rows[0];
  } catch (err) {
    console.err(err);
    throw err;
  }
};
export const renameColumn = async (id, newName) => {
  try {
    const res = pool.query(
      `
      UPDATE
      columns
      SET 
      name = $1
      WHERE
      id = $2
      RETURNING
      *
      `,
      [newName, id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const removeTask = async (id) => {
  try {
    const res = await pool.query(
      `
      DELETE FROM 
      tasks
      WHERE
      id = $1
      RETURNING
      *
      `,
      [id],
    );
    return res.rows[0];
  } catch (err) {
    console.err(err);
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
export const renameTask = async (id, newName) => {
  try {
    const res = pool.query(
      `
      UPDATE
      tasks
      SET 
      name = $1
      WHERE
      id = $2
      RETURNING
      *
      `,
      [newName, id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
