import bcrypt from "bcrypt";
import env from "../config/env.js";

const hashPassword = async (password) => {
  return bcrypt.hash(password, env.BCRYPT_ROUNDS);
};

export default hashPassword;
