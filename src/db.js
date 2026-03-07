import fs from "node:fs/promises";

const DB_PATH = new URL("../data.json", import.meta.url).pathname;

export const getDB = async () => {
  let data = await fs.readFile(DB_PATH, "utf-8");
  return data;
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, db);
  return db;
};
