"use strict";

import Board from "./src/Board.js";
import Render from "./src/Renderers/Render.js";

const board = Board();
await board.save();
board.DOM = board.prevDOM = Render(board);
document.body.replaceChildren(board.DOM);

function updateDOM(board) {
  if (isDifferent(board)) {
    board.prevDOM = board.DOM;
    board.DOM = Render(board);
    document.body.replaceChildren(board.DOM);
  }
}

function isDifferent(board) {
  const prevDOM;
}

setInterval(async () => {
  await board.save();
  document.body.replaceChildren(board.DOM);
}, 500);

//setting title and linking CSS
document.title = "Kanban board";
document.head.append(
  (() => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = "./style.css";
    return style;
  })(),
);
