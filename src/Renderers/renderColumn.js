import { curryOnce, renderRemoveBtn, renderAddTaskBtn } from "../utils.js";
import renderTask from "./renderTask.js";

export default function renderColumn(board, column) {
  const element = document.createElement(column.element);
  element.classList.add("column");
  const tasks = column.children.map((id) => board.elements.get(id));

  const container = document.createElement("div");
  container.classList.add("column-heading");
  const titleElement = document.createElement("h2");
  titleElement.textContent = column.title;

  const removeBtn = renderRemoveBtn();
  removeBtn.addEventListener("click", () => {
    board.remove(column.id);
  });
  const addBtn = renderAddTaskBtn();
  addBtn.addEventListener("click", () => {
    taskTemplate.classList.remove("hidden");
  });
  const titleAndRemoveBtn = document.createElement("div");
  titleAndRemoveBtn.classList.add("column-title-and-remove-btn");

  const taskTemplate = document.createElement("div");
  taskTemplate.classList.add("task-template", "hidden");

  const inputTitle = document.createElement("input");
  inputTitle.placeholder = "Title";
  inputTitle.classList.add("input");

  const inputContent = document.createElement("input");
  inputContent.placeholder = "Content";
  inputContent.classList.add("input");

  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = "Add";
  btn.addEventListener("click", () => {
    taskTemplate.classList.add("hidden");
    board.createTask(column.id, inputTitle.value, inputContent.value);
  });

  element.draggable = true;
  element.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  element.addEventListener("dragstart", (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("type", "column");
    e.dataTransfer.setData("id", column.id);
  });
  element.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");
    if (type == "column") {
      board.shiftColumn(column.id, id);
    } else if (type == "task") {
      board.shiftTask(column.id, id);
    }
  });

  titleAndRemoveBtn.append(titleElement, removeBtn);
  container.append(titleAndRemoveBtn, addBtn);
  taskTemplate.append(inputTitle, inputContent, btn);
  element.append(
    container,
    taskTemplate,
    ...tasks.map(curryOnce(renderTask)(board)),
  );
  return element;
}
