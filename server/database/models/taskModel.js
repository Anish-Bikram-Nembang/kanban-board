import pool from "../pg.js";

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
    const res = await pool.query(
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
