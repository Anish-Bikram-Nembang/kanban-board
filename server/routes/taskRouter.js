import express from "express";
import {
  createTask,
  getTaskById,
  renameTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/:id", getTaskById);
router.patch("/:id", renameTask);
router.delete("/:id", deleteTask);

export default router;
