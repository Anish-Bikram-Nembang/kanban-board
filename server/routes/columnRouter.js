import express from "express";
import {
  createColumn,
  getColumnById,
  renameColumn,
  deleteColumn,
} from "../controllers/columnController.js";

const router = express.Router();

router.post("/", createColumn);
router.get("/:id", getColumnById);
router.patch("/:id", renameColumn);
router.delete("/:id", deleteColumn);

export default router;
