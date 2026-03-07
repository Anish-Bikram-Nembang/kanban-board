"use strict";

import Board from "./src/Board.js";
import Render from "./src/Renderers/Render.js";

const board = Board();
await board.save();
document.body.replaceChildren(Render(board));

setInterval(async () => {
  await board.save();
  document.body.replaceChildren(Render(board));
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
