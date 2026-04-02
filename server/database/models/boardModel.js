import pool from "../pg.js";

export const deleteBoard = async ({ user_id, id }) => {
  const res = await pool.query(
    `
      DELETE FROM boards b
      WHERE b.id = $1
      AND b.user_id = $2
      RETURNING b.*
      `,
    [id, user_id],
  );
  return res.rows[0];
};

export const getBoards = async ({ user_id }) => {
  const res = await pool.query(
    `
    SELECT b.*
    FROM boards b 
    WHERE b.user_id = $1
    `,
    [user_id],
  );
  return res.rows;
};

export const getBoardById = async ({ user_id, id }) => {
  const res = await pool.query(
    `
    SELECT b.* 
    FROM boards b 
    WHERE b.id = $1
    AND b.user_id = $2
    `,
    [id, user_id],
  );
  return res.rows[0];
};

export const createBoard = async ({ user_id, name }) => {
  const res = await pool.query(
    `
      INSERT INTO boards 
      (user_id, name)
      VALUES ($1, $2)
      RETURNING *
      `,
    [user_id, name],
  );
  return res.rows[0];
};

export const updateBoardName = async ({ user_id, id, newName }) => {
  const res = await pool.query(
    `
      UPDATE boards b
      SET name = $1
      WHERE b.id = $2
      AND b.user_id = $3
      RETURNING b.*
      `,
    [newName, id, user_id],
  );
  return res.rows[0];
};
