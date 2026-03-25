import pool from "../pg.js";

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
    const res = await pool.query(
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
