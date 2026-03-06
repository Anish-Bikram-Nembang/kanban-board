export default function render(board) {
  const rootContainer = document.createElement("div");
  rootContainer.classList.add("container");

  const columns = board.root.map((id) => board.elements[id]);
  rootContainer.append(...columns.map(curryOnce(renderColumn)(board)));

  return rootContainer;
}

function curryOnce(fn) {
  return function (arg1) {
    return function (arg2) {
      return fn(arg1, arg2);
    };
  };
}
function renderColumn(board, column) {
  const element = document.createElement(column.element);
  element.classList.add("column");

  const titleAndBtn = ElementWithTitleAndRemoveBtn(column.title);
  titleAndBtn.classList.add("column-title");

  element.append(titleAndBtn);

  const tasks = column.children.map((id) => board.elements.get(id));
  element.append(...tasks.map(renderTask));

  return element;
}

function renderTask(task) {
  const element = document.createElement(task.element);
  element.classList.add("task");

  const titleAndBtn = ElementWithTitleAndRemoveBtn(task.title);
  titleAndBtn.classList.add("task-title");
  element.append(titleAndBtn);

  const content = document.createElement("p");
  content.textContent = task.content;
  content.classList.add("task-content");
  element.append(content);

  return element;
}

function ElementWithTitleAndRemoveBtn(title, titleSize = "h2") {
  const container = document.createElement("div");
  container.classList.add("title-and-removebtn");

  const titleElement = document.createElement(titleSize);
  titleElement.textContent = title;

  const btn = document.createElement("button");
  btn.textContent = "✗";
  btn.classList.add("remove");

  container.append(titleElement, btn);

  return container;
}
