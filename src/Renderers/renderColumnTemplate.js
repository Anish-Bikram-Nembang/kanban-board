import { renderInputElement } from "../utils.js";

export default function renderColumnTemplate(board) {
  const container = document.createElement("div");
  container.classList.add("add-column");
  const titleInput = renderInputElement("Column title");
  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Column";
  addBtn.classList.add("btn");
  addBtn.addEventListener("click", () => {
    board.createColumn(titleInput.value);
    titleInput.value = "";
  });
  container.append(titleInput, addBtn);
  return container;
}
