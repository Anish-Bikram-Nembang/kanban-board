import express from "express";
import {
  createColumn,
  getColumns,
  getColumnById,
  updateColumn,
  deleteColumn,
} from "../controllers/columnController.js";

const router = express.Router();

router.post("/", createColumn);
router.get("/", getColumns);
router.get("/:id", getColumnById);
router.patch("/:id", updateColumn);
router.delete("/:id", deleteColumn);

export default router;
