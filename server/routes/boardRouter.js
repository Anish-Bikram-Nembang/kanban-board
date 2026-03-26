import express from "express";
import {
  createBoard,
  getBoardById,
  renameBoard,
  deleteBoard,
} from "../controllers/boardController.js";

const router = express.Router();

router.post("/", createBoard);
router.get("/:id", getBoardById);
router.patch("/:id", renameBoard);
router.delete("/:id", deleteBoard);

export default router;
