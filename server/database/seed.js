import pool from "./pg.js";
const client = await pool.connect();
const config = {
  userCount: 10,
  boardCount: 5,
  columnCount: 5,
  taskCount: 8,
};

const seed = async ({ userCount, boardCount, columnCount, taskCount }) => {
  try {
    await client.query("BEGIN");
    let userQuery = [];
    let boardQuery = [];
    let columnQuery = [];
    let taskQuery = [];
    for (let i = 1; i <= userCount; i++) {
      userQuery.push(
        `('jane', 'doe', 'JaneTheDoe${i}' , 'janedoe@gmail.com${i}', '2$3232@fdvdfc')`,
      );
    }
    const userRes = await client.query(
      `
      INSERT INTO users (first_name, last_name, username, email, password)
      VALUES ${userQuery.join(",")}
      RETURNING id
    `,
    );
    const userIds = userRes.rows.map((r) => r.id);
    for (const userId of userIds) {
      for (let i = 1; i <= boardCount; i++) {
        boardQuery.push(`(${userId}, 'demo_board${i}')`);
      }
    }
    const boardRes = await client.query(
      `
      INSERT INTO boards (user_id, name)
      VALUES ${boardQuery.join(",")}
      RETURNING id
    `,
    );
    const boardIds = boardRes.rows.map((r) => r.id);
    for (const boardId of boardIds) {
      for (let i = 1; i <= columnCount; i++) {
        columnQuery.push(`(${boardId}, 'demo_column${i}', ${i})`);
      }
    }
    const columnRes = await client.query(
      `
      INSERT INTO columns (board_id, name, position)
      VALUES ${columnQuery.join(",")}
      RETURNING id
    `,
    );
    const columnIds = columnRes.rows.map((r) => r.id);
    for (const columnId of columnIds) {
      for (let i = 1; i <= taskCount; i++) {
        taskQuery.push(
          `(${columnId}, 'demo_task${i}', 'demo description', ${i})`,
        );
      }
    }
    const taskRes = await client.query(
      `
      INSERT INTO tasks (column_id, name, description, position)
      VALUES ${taskQuery.join(",")}
      RETURNING id
    `,
    );
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

await seed(config);
