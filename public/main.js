"use strict";

import Board from "./src/Board.js";
import Render from "./src/Renderers/Render.js";
import { checkToken } from "./src/utils.js";

checkToken();
const container = document.createElement("div");
container.classList.add("container");
document.body.replaceChildren(container);

const board = Board();
await board.load();
document.body.replaceChildren(Render(board));

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
