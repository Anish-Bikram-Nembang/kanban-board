import * as boardModel from "../database/models/boardModel.js";

export const createBoard = async (req, res, next) => {
  try {
    const board = await boardModel.createBoard({
      user_id: req.user.id,
      name: req.body.name,
    });
    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
};
export const getBoards = async (req, res, next) => {
  try {
    const boards = await boardModel.getBoards({ user_id: req.user.id });
    if (!boards) {
      return res.status(404).json({ message: "No boards found" });
    }
    res.status(200).json(boards);
  } catch (err) {
    next(err);
  }
};
export const getBoardById = async (req, res, next) => {
  try {
    const board = await boardModel.getBoardById({
      user_id: req.user.id,
      id: req.body.id,
    });
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json(board);
  } catch (err) {
    next(err);
  }
};
export const updateBoard = async (req, res, next) => {};
export const deleteBoard = async (req, res, next) => {
  try {
    const deletedBoard = await boardModel.deleteBoard({
      user_id: req.user.id,
      id: req.body.id,
    });
    if (!board) {
      return res.status(404).json({ message: "Could not delete board" });
    }
    res.status(200).json(deletedBoard);
  } catch (err) {
    next(err);
  }
};
