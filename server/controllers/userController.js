import * as userModel from "../database/models/userModel.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getUsers();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const user = await userModel.getUserById({ id: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {};
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await userModel.deleteUser({ id: req.body.id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (err) {
    next(err);
  }
};
