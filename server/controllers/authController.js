import bcrypt from "bcrypt";
import pool from "../database/pg.js";
import env from "../config/env.js";
import generateToken from "../utils/jwt.js";
import hashPassword from "../utils/password.js";
import registerUser from "../database/models/authModel.js";

export const register = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const regRes = await registerUser({
      ...req.body,
      password: hashedPassword,
    });
    const user = regRes.rows[0];
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    res.status(201).json({
      message: "User registered",
      user,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
};
