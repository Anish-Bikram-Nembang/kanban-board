import { curryOnce, renderRemoveBtn, renderAddTaskBtn } from "../utils.js";
import renderTask from "./renderTask.js";

export default function renderColumn(board, column) {
  const element = document.createElement(column.element);
  element.classList.add("column");
  element.id = column.id;
  const tasks = column.children.map((id) => board.elements.get(id));

  const container = document.createElement("div");
  container.classList.add("column-heading");

  const titleAndRemoveBtn = document.createElement("div");
  titleAndRemoveBtn.classList.add("column-title-and-remove-btn");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("task-title");
  titleElement.textContent = column.title;
  titleElement.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.classList.add("rename-input");
    input.value = titleElement.textContent;
    titleAndRemoveBtn.replaceChild(input, titleElement);
    input.focus();

    input.addEventListener("keydown", async (e) => {
      if (e.code == "Enter") {
        titleElement.textContent = input.value;
        column.title = input.value;
        titleAndRemoveBtn.replaceChild(titleElement, input);
        await board.save();
      }
    });
  });

  const removeBtn = renderRemoveBtn();
  removeBtn.addEventListener("click", () => {
    board.remove(column.id);
  });
  const addBtn = renderAddTaskBtn();
  addBtn.addEventListener("click", () => {
    if (!column.presenceOfTaskTemplate) {
      taskTemplate.classList.remove("hidden");
      column.presenceOfTaskTemplate = true;
    }
  });

  const taskTemplate = document.createElement("div");
  taskTemplate.id = crypto.randomUUID();
  column.presenceOfTaskTemplate
    ? taskTemplate.classList.add("task-template")
    : taskTemplate.classList.add("task-template", "hidden");

  const inputTitle = document.createElement("input");
  inputTitle.placeholder = "Title";
  inputTitle.classList.add("input");

  const inputContent = document.createElement("input");
  inputContent.placeholder = "Content";
  inputContent.classList.add("input");

  inputTitle.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      inputContent.focus();
    }
  });

  inputContent.addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      createTask();
    }
  });
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = "Add";
  btn.addEventListener("click", createTask);

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
  board.DOM.set(column.id, element);
  return element;

  async function createTask() {
    if (column.presenceOfTaskTemplate) {
      taskTemplate.classList.add("hidden");
      board.createTask(column.id, inputTitle.value, inputContent.value);
      inputTitle.value = "";
      inputContent.value = "";
      column.presenceOfTaskTemplate = false;
    }
  }
}
