import pool from "./pg.js";

const deleteTables = async () => {
  await pool.query(
    `
    DROP TABLE IF EXISTS 
    tasks CASCADE,
    columns CASCADE,
    boards CASCADE,
    users CASCADE
    `,
  );
};

const defineUsersTable = async () => {
  await pool.query(
    `
    CREATE TABLE users (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name VARCHAR(63) NOT NULL,
      last_name VARCHAR(63) NOT NULL,
      username VARCHAR(63) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(63) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
    `,
  );
};

const defineBoardsTable = async () => {
  await pool.query(
    `
  CREATE TABLE boards (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(63) NOT NULL 
  )
  `,
  );
};
const defineColumnsTable = async () => {
  await pool.query(
    `
  CREATE TABLE columns (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    board_id INT REFERENCES boards(id) ON DELETE CASCADE,
    name VARCHAR(63) NOT NULL,
    position INT NOT NULL,
    CONSTRAINT unique_position_per_board UNIQUE (board_id, position)
  )
  `,
  );
};
const defineTasksTable = async () => {
  await pool.query(
    `
  CREATE TABLE tasks (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    column_id INT REFERENCES columns(id) ON DELETE CASCADE,
    name VARCHAR(63) NOT NULL,
    description text,
    position INT NOT NULL,
    CONSTRAINT unique_position_per_column UNIQUE (column_id, position)
  )
  `,
  );
};

const defineSchema = async () => {
  await deleteTables();
  await defineUsersTable();
  await defineBoardsTable();
  await defineColumnsTable();
  await defineTasksTable();
};

await defineSchema();
