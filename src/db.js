import fs from "node:fs/promises";

const DB_PATH = new URL("../data.json", import.meta.url).pathname;

export const getDB = async () => {
  let data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
  return data;
};

export const saveDB = async (db) => {
  console.log("in saveDB", db);
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};
