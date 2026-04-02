import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.DB_USER ||
  !process.env.DB_HOST ||
  !process.env.DB_NAME ||
  !process.env.DB_PASSWORD ||
  !process.env.JWT_SECRET
) {
  throw new Error("Missing required env variables");
}

const env = {
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  PORT: Number(process.env.PORT) || 3000,
  BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS) || 12,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  JWT_SECRET: process.env.JWT_SECRET,
};

export default env;
