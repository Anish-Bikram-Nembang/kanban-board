import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePasswords } from "../utils/password.js";
import * as userModel from "../database/models/userModel.js";

export const register = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const registeredUser = await userModel.createUser({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const token = await generateToken({
      id: registeredUser.id,
      username: registeredUser.username,
      email: registeredUser.email,
    });
    res.status(201).json({
      message: "User registered",
      registeredUser,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to register user" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = await generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    res.status(200).json({
      message: "User logged in",
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
