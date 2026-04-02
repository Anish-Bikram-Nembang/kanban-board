import express from "express";
import {
  createColumn,
  getColumns,
  getColumnById,
  updateColumn,
  deleteColumn,
  getColumnsByBoard,
} from "../controllers/columnController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();
router.use(authenticateToken);

router.post("/", createColumn);
router.get("/", getColumns);
router.get("/board/:id", getColumnsByBoard);
router.get("/:id", getColumnById);
router.patch("/:id", updateColumn);
router.delete("/:id", deleteColumn);

export default router;
