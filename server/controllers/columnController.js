import * as columnModel from "../database/models/columnModel.js";

export const createColumn = async (req, res, next) => {
  try {
    const column = await columnModel.createColumn({
      user_id: req.user.id,
      board_id: req.body.board_id,
      name: req.body.name,
    });
    res.status(201).json(column);
  } catch (err) {
    next(err);
  }
};
export const getColumns = async (req, res, next) => {
  try {
    const columns = await columnModel.getColumns({
      user_id: req.user.id,
    });
    if (!columns) {
      return res.status(404).json({ message: "Columns not found" });
    }
    res.status(200).json(columns);
  } catch (err) {
    next(err);
  }
};
export const getColumnsByBoard = async (req, res, next) => {
  try {
    const columns = await columnModel.getColumnsByBoard({
      user_id: req.user.id,
      board_id: req.body.board_id,
    });
    if (!columns) {
      return res.status(404).json({ message: "Columns not found" });
    }
    res.status(200).json(columns);
  } catch (err) {
    next(err);
  }
};
export const getColumnById = async (req, res, next) => {
  try {
    const column = await columnModel.getColumnById({
      user_id: req.user.id,
      id: req.body.id,
    });
    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }
    res.status(200).json(column);
  } catch (err) {
    next(err);
  }
};
export const updateColumn = async (req, res, next) => {};
export const deleteColumn = async (req, res, next) => {
  try {
    const deletedColumn = await columnModel.deleteColumn({
      user_id: req.user.id,
      id: req.body.id,
    });
    if (!deletedColumn) {
      return res.status(404).json({ message: "Couldn't delete column" });
    }
    res.status(200).json(deletedColumn);
  } catch (err) {
    next(err);
  }
};
