import express from "express";
import {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();
router.use(authenticateToken);

router.post("/", createBoard);
router.get("/", getBoards);
router.get("/:id", getBoardById);
router.patch("/:id", updateBoard);
router.delete("/:id", deleteBoard);

export default router;
