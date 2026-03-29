import pool from "../pg.js";

export const createColumn = async (boardID, name) => {
  try {
    const res = await pool.query(
      `
        INSERT INTO columns (name, board_id)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, boardID],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getColumns = async (user_id) => {
  try {
    const res = await pool.query(
      `
      SELECT c.*
      FROM columns c
      JOIN boards b
      ON c.board_id = b.id 
      WHERE b.user_id = $1
      `,
      [user_id],
    );
    return res.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getColumnById = async (id) => {
  try {
    const res = await pool.query(
      `
      SELECT c.*
      FROM columns c
      WHERE c.id = $1
      `,
      [id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const shiftColumn = async (id, position) => {
  try {
    const res = await pool.query(
      `
      UPDATE columns
      SET position = $1
      WHERE id = $2
      RETURNING *
      `,
      [position, id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const updateColumnName = async (id, newName) => {
  try {
    const res = await pool.query(
      `
      UPDATE columns
      SET name = $1
      WHERE id = $2
      RETURNING *
      `,
      [newName, id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const deleteColumn = async (id) => {
  try {
    const res = await pool.query(
      `
      DELETE FROM columns
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );
    return res.rows[0];
  } catch (err) {
    console.err(err);
    throw err;
  }
};
