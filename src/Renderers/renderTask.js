import { renderRemoveBtn } from "../utils.js";

export default function renderTask(board, task) {
  const element = document.createElement(task.element);
  element.classList.add("task");
  element.id = task.id;

  const container = document.createElement("div");
  container.classList.add("task-title-and-remove-btn");

  const titleElement = document.createElement("h4");
  titleElement.textContent = task.title;
  // titleElement.addEventListener("dblclick", (e) ={
  //   e.preventDefault();
  //
  // })

  const removeBtn = renderRemoveBtn();
  removeBtn.addEventListener("click", () => {
    board.remove(task.id);
  });

  const content = document.createElement("p");
  content.textContent = task.content;
  content.classList.add("task-content");

  element.draggable = true;
  element.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  element.addEventListener("dragstart", (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("type", "task");
    e.dataTransfer.setData("id", task.id);
  });
  element.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");
    if (type == "column") {
      board.shiftColumn(task.id, id);
    } else if (type == "task") {
      board.shiftTask(task.id, id);
    }
  });

  container.append(titleElement, removeBtn);
  element.append(container, content);
  board.DOM.set(task.id, element);
  return element;
}
