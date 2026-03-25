import pool from "../pg.js";

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
    const res = await pool.query(
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
