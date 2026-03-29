import pool from "../pg.js";

export const deleteTask = async (id) => {
  try {
    const res = await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *
      `,
      [id],
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
export const getTaskById = async (id) => {
  try {
    const res = await pool.query(
      `
      SELECT t.*
      FROM tasks t
      WHERE t.id = $1
      `,
      [id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const shiftTask = async (id, position) => {
  try {
    const res = await pool.query(
      `
      UPDATE tasks
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
export const createTask = async (column_id, name, description = "") => {
  try {
    const positionRes = await pool.query(
      `
      SELECT COALESCE(MAX(position), 0) + 1
      AS position
      FROM tasks t
      WHERE t.column_id = $1
      `,
      [column_id],
    );
    const position = Number(positionRes.rows[0].position);
    const res = await pool.query(
      `
        INSERT INTO tasks 
        (name, description, column_id, position)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
      [name, description, column_id, position],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const updateTaskName = async (id, newName) => {
  try {
    const res = await pool.query(
      `
      UPDATE tasks
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
export const updateTaskDesc = async (id, newDesc) => {
  try {
    const res = await pool.query(
      `
      UPDATE tasks
      SET description = $1
      WHERE id = $2
      RETURNING *
      `,
      [newDesc, id],
    );
    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
