import pool from "../pg.js";

export const createUser = async ({
  first_name,
  last_name,
  username,
  email,
  password,
}) => {
  const res = await pool.query(
    `
    INSERT INTO users (first_name, last_name, username, email, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, username, email
    `,
    [first_name, last_name, username, email, password],
  );
  return res.rows[0];
};
export const getUsers = async () => {
  const res = await pool.query(
    `
    SELECT * FROM users
    `,
  );
  return res.rows;
};
export const getUserById = async ({ id }) => {
  const res = await pool.query(
    `
    SELECT * FROM users
    WHERE id = $1
    `,
    [id],
  );
  return res.rows[0];
};
export const updateUsername = async ({ id, newUsername }) => {
  const res = await pool.query(
    `
    UPDATE users
    SET username = $2
    WHERE id = $1
    RETURNING *
    `,
    [id, newUsername],
  );
  return res.rows[0];
};
export const updateEmail = async ({ id, newEmail }) => {
  const res = await pool.query(
    `
    UPDATE users
    SET email = $2
    WHERE id = $1
    RETURNING *
    `,
    [id, newEmail],
  );
  return res.rows[0];
};
export const updatePassword = async ({ id, newPassword }) => {
  const res = await pool.query(
    `
    UPDATE users
    SET password = $2
    WHERE id = $1
    RETURNING id
    `,
    [id, newPassword],
  );
  return res.rows[0];
};
export const updateFirstName = async ({ id, newFirstname }) => {
  const res = await pool.query(
    `
    UPDATE users
    SET first_name = $2
    WHERE id = $1
    RETURNING *
    `,
    [id, newFirstname],
  );
  return res.rows[0];
};
export const updateLastName = async ({ id, newLastname }) => {
  const res = await pool.query(
    `
    UPDATE users
    SET last_name = $2
    WHERE id = $1
    RETURNING *
    `,
    [id, newLastname],
  );
  return res.rows[0];
};
export const deleteUser = async ({ id }) => {
  const res = await pool.query(
    `
    DELETE FROM users 
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
  return res.rows[0];
};
