import renderColumn from "./renderColumn.js";
import renderColumnTemplate from "./renderColumnTemplate.js";

import { curryOnce } from "../utils.js";

export default function render(board) {
  const rootContainer = document.createElement("div");
  rootContainer.classList.add("container");

  const columns = board.root.map((id) => board.elements.get(id));

  const columnTemplate = renderColumnTemplate(board);
  rootContainer.append(
    ...columns.map(curryOnce(renderColumn)(board)),
    columnTemplate,
  );

  return rootContainer;
}
