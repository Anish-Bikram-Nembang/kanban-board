import pool from "../pg.js";

export const createColumn = async ({ user_id, board_id, name }) => {
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
};
export const getColumns = async ({ user_id }) => {
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
};
export const getColumnsByBoard = async ({ user_id, board_id }) => {
  const res = await pool.query(
    `
      SELECT c.*
      FROM columns c
      JOIN boards b
      ON c.board_id = b.id 
      WHERE b.user_id = $1
      AND b.id = $2
      `,
    [user_id, board_id],
  );
  return res.rows;
};
export const getColumnById = async ({ user_id, id }) => {
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
};
export const updateColumnPosition = async ({ user_id, id, position }) => {
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
};
export const updateColumnName = async ({ user_id, id, newName }) => {
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
};
export const deleteColumn = async ({ user_id, id }) => {
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
};
