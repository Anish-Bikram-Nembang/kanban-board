import pool from "../pg.js";

export const createColumn = async (user_id, board_id, name) => {
  try {
    const res = await pool.query(
      `
        INSERT INTO columns (name, board_id, position)
        SELECT $1, $2, COALESCE(MAX(c.position), 0) + 1
        FROM columns c
        JOIN boards b ON c.board_id = b.id 
        WHERE b.id = $2
        AND b.user_id = $3
        RETURNING *
      `,
      [name, board_id, user_id],
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
export const getColumnById = async (user_id, id) => {
  try {
    const res = await pool.query(
      `
      SELECT c.*
      FROM columns c
      JOIN boards b
      ON c.board_id = b.id 
      WHERE c.id = $1
      AND b.user_id = $2
      `,
      [id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const shiftColumn = async (user_id, id, position) => {
  try {
    const res = await pool.query(
      `
      UPDATE columns c
      SET c.position = $1
      FROM boards b 
      WHERE c.board_id = b.id 
      AND c.id = $2
      AND b.user_id = $3
      RETURNING *
      `,
      [position, id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const updateColumnName = async (user_id, id, newName) => {
  try {
    const res = await pool.query(
      `
      UPDATE columns c
      SET c.name = $1
      FROM boards b 
      WHERE c.id = $2
      AND b.user_id = $3
      AND c.board_id = b.id
      RETURNING *
      `,
      [newName, id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const deleteColumn = async (user_id, id) => {
  try {
    const res = await pool.query(
      `
      DELETE FROM columns c
      USING boards b 
      WHERE c.id = $1
      AND b.user_id = $2
      AND c.board_id = b.id
      RETURNING c.*
      `,
      [id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
