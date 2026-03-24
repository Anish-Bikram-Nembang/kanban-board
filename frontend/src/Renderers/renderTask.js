import { renderRemoveBtn } from "../utils.js";

export default function renderTask(board, task) {
  const element = document.createElement(task.element);
  element.classList.add("task");
  element.id = task.id;

  const container = document.createElement("div");
  container.classList.add("task-title-and-remove-btn");

  const titleElement = document.createElement("h4");
  titleElement.textContent = task.title;
  titleElement.classList.add("task-title");
  titleElement.addEventListener("dblclick", async () => {
    const input = document.createElement("input");
    input.classList.add("rename-input");
    input.value = titleElement.textContent;
    container.replaceChild(input, titleElement);
    input.focus();

    input.addEventListener("keydown", async (e) => {
      if (e.code == "Enter") {
        titleElement.textContent = input.value;
        task.title = input.value;
        container.replaceChild(titleElement, input);
        await board.save();
      }
    });
  });

  const removeBtn = renderRemoveBtn();
  removeBtn.addEventListener("click", () => {
    board.remove(task.id);
  });

  const content = document.createElement("p");
  content.textContent = task.content;
  content.classList.add("task-content");
  content.addEventListener("dblclick", async () => {
    const input = document.createElement("input");
    input.classList.add("rename-input");
    input.value = content.textContent;
    element.replaceChild(input, content);
    input.focus();

    input.addEventListener("keydown", async (e) => {
      if (e.code == "Enter") {
        content.textContent = input.value;
        task.content = input.value;
        element.replaceChild(content, input);
        await board.save();
      }
    });
  });

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
