import * as taskModel from "../database/models/taskModel.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await taskModel.createTask({
      user_id: req.user.id,
      column_id: req.body.column_id,
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel.getTasks({ user_id: req.user.id });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};
export const getTasksByColumn = async (req, res, next) => {
  try {
    const tasks = await taskModel.getTasksByColumn({
      user_id: req.user.id,
      column_id: req.body.column_id,
    });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};
export const getTaskById = async (req, res) => {
  try {
    const task = await taskModel.getTaskById({
      user_id: req.user.id,
      id: req.params.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};
export const updateTask = async (req, res) => {
  try {
    const updateInfo = {
      id: req.params.id,
      user_id: req.user.id,
      newName: req.body.newName,
      newDesc: req.body.newDesc,
      position: req.body.position,
    };
    let updatedTask;
    if (updateInfo.newName) {
      updatedTask = await taskModel.updateTaskName(updateInfo);
    }
    if (updateInfo.newDesc) {
      updatedTask = await taskModel.updateTaskDesc(updateInfo);
    }
    if (updateInfo.position) {
      updatedTask = await taskModel.updateTaskPosition(updateInfo);
    }
    res.send(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await taskModel.deleteTask({
      user_id: req.user.id,
      id: req.params.id,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: "Couldn't delete task" });
    }
    res.status(200).json(deletedTask);
  } catch (err) {
    next(err);
  }
};
