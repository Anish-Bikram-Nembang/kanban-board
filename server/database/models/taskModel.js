import pool from "../pg.js";

export const deleteTask = async (user_id, id) => {
  try {
    const res = await pool.query(
      `
      DELETE FROM tasks t 
      USING columns c, boards b 
      WHERE t.column_id = c.id 
      AND c.board_id = b.id 
      AND t.id = $1
      AND b.user_id = $2 
      RETURNING t.*
      `,
      [id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getTasks = async (user_id) => {
  try {
    const res = await pool.query(
      `
      SELECT t.*
      FROM tasks t 
      JOIN columns c ON t.column_id = c.id
      JOIN boards b ON c.board_id = b.id
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
export const getTaskById = async (user_id, id) => {
  try {
    const res = await pool.query(
      `
      SELECT t.*
      FROM tasks t 
      JOIN columns c ON t.column_id = c.id
      JOIN boards b ON c.board_id = b.id
      WHERE b.user_id = $2
      AND t.id = $1
      
      `,
      [id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const shiftTask = async (user_id, id, position) => {
  try {
    const res = await pool.query(
      `
      UPDATE tasks t 
      SET position = $1
      FROM columns c 
      JOIN boards b ON c.board_id = b.id 
      WHERE t.column_id = c.id 
      AND t.id = $2 
      AND b.user_id = $3
      RETURNING t.*
      `,
      [position, id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const createTask = async (
  user_id,
  column_id,
  name,
  description = "",
) => {
  try {
    const res = await pool.query(
      `
        INSERT INTO tasks 
        (name, description, column_id, position)
        SELECT $1, $2, $3, COALESCE(MAX(t.position), 0) + 1
        FROM columns c 
        JOIN boards b ON c.board_id = b.id 
        LEFT JOIN tasks t ON t.column_id = c.id 
        WHERE c.id = $3
        AND b.user_id = $4
        GROUP BY c.id 
        RETURNING t.*
        `,
      [name, description, column_id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const updateTaskName = async (user_id, id, newName) => {
  try {
    const res = await pool.query(
      `
      UPDATE tasks t 
      SET name = $1
      FROM columns c 
      JOIN boards b 
      ON c.board_id = b.id 
      WHERE t.column_id = c.id 
      AND t.id = $2 
      AND b.user_id = $3
      RETURNING t.*
      `,
      [newName, id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const updateTaskDesc = async (user_id, id, newDesc) => {
  try {
    const res = await pool.query(
      `
      UPDATE tasks t 
      SET description = $1
      FROM columns c 
      JOIN boards b 
      ON c.board_id = b.id
      WHERE t.column_id = c.id 
      AND t.id = $2 
      AND b.user_id = $3
      RETURNING t.*
      `,
      [newDesc, id, user_id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
