"use strict";

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

const state = {
  columns: new Map(),
  tasks: new Map(),
};

function generateColumn(title) {
  const column = {
    id: crypto.randomUUID(),
    presenceOfTaskTemplate: false,
    type: "columns",
    element: "div",
    handleDragStart: function (e) {
      e.dataTransfer.setData("sourceColumn", this.columnID);
      e.dataTransfer.setData("id", this.id);
      e.dataTransfer.setData("type", this.type);
    },
    handleDrop: function (e) {
      e.preventDefault();
      const id = e.dataTransfer.getData("id");
      const sourceColumn = e.dataTransfer.getData("sourceColumn");
      const type = e.dataTransfer.getData("type");
      if (type === "task") {
        changeTaskColumn(id, sourceColumn, this.id);
      } else if (type === "columns") {
        changeColumnPosition(id, this.id);
      }
      updateDOM();
    },
    handleDragover: function (e) {
      e.preventDefault();
    },
    children: [],
  };
  column.props = {
    onDrop: column.handleDrop.bind(column),
    onDragover: column.handleDragover.bind(column),
    onDragstart: column.handleDragStart.bind(column),
    draggable: "true",
  };
  const children = {
    element: "div",
    type: "column-header",
    title: "",
    children: [
      { element: "h2", type: "title", title: title, children: [] },
      {
        element: "button",
        type: "add",
        title: "Add task",
        children: [],
        handleClick() {
          if (column.presenceOfTaskTemplate === false) {
            column.children.push(column.generateTaskTemplate());
            column.presenceOfTaskTemplate = true;
            updateDOM();
          }
        },
      },
      {
        element: "button",
        type: "remove",
        title: "",
        children: [
          {
            element: "span",
            type: "remove",
            title: "✗",
            handleClick(e) {
              e.preventDefault();
              e.stopPropagation();
              vDOM = vDOM.filter((a) => a.id != column.id);
              state.columns.delete(column.id);
              updateDOM();
            },
            children: [],
          },
        ],
      },
    ],
  };
  column.generateTaskTemplate = function () {
    const taskTemplate = {
      title: "",
      element: "div",
      type: "task-template",
      props: {},
      children: [],
    };
    const taskTemplateChildren = [
      {
        title: "",
        element: "input",
        type: "task-title-input",
        props: {},
        children: [],
        handleInput(e) {
          this.inputValue = e.target.value;
        },
      },
      {
        title: "",
        element: "input",
        type: "task-content-input",
        props: {},
        children: [],
        handleInput(e) {
          this.inputValue = e.target.value;
        },
      },
      {
        title: "Add",
        element: "button",
        type: "task-add-btn",
        props: {},
        children: [],
      },
    ];
    taskTemplate.children.push(...taskTemplateChildren);
    taskTemplate.children[2].handleClick = function () {
      const taskTitle = taskTemplate.children[0].inputValue;
      const taskContent = taskTemplate.children[1].inputValue;
      column.children.pop();
      column.children.push(generateTask(taskTitle, taskContent, column.id));
      column.presenceOfTaskTemplate = false;
      updateDOM();
    };
    return taskTemplate;
  };
  column.children.push(children);
  state.columns.set(column.id, column);
  return column;
}

function generateTask(title = "", content = "", columnID) {
  const task = {
    id: crypto.randomUUID(),
    title: "",
    columnID: columnID,
    element: "div",
    type: "task",
    handleDragStart: function (e) {
      e.stopPropagation();
      e.dataTransfer.setData("sourceColumn", this.columnID);
      e.dataTransfer.setData("id", this.id);
      e.dataTransfer.setData("type", this.type);
    },
    children: [
      {
        title: title,
        type: "task-title",
        element: "div",
        children: [
          {
            element: "button",
            type: "remove",
            title: "✗",
            handleClick(e) {
              e.preventDefault();
              e.stopPropagation();
              const id = vDOM.findIndex((a) => a.id == columnID);
              const column = vDOM[id];
              column.children = column.children.filter((a) => a.id != task.id);
              state.tasks.delete(task.id);
              updateDOM();
            },
            children: [],
          },
        ],
      },
      {
        title: content,
        type: "task-content",
        element: "p",
        props: {},
        children: [],
      },
    ],
  };
  task.props = {
    onDragstart: task.handleDragStart.bind(task),
    draggable: "true",
  };
  state.tasks.set(task.id, task);
  return task;
}

function addTask(column, title, content) {
  let task = generateTask(title, content);
  column.children.push(task);
}
function addProps(element, props) {
  for (const key in props) {
    if (key.startsWith("on") && typeof props[key] === "function") {
      const event = key.slice(2).toLowerCase();
      element.addEventListener(event, props[key]);
    } else {
      element.setAttribute(key, props[key]);
    }
  }
}

function convert(node) {
  const element = document.createElement(node.element);
  element.classList.add(node.type);
  element.textContent = node.title;
  element.onclick = node.handleClick;
  element.id = node.id;
  if (node.handleInput) {
    element.addEventListener("input", (e) => {
      node.handleInput.call(node, e);
    });
  }
  element.value = node.inputValue == undefined ? "" : node.inputValue;
  addProps(element, node.props);
  if (node.children != undefined) {
    element.append(...node.children.map(convert));
  }
  return element;
}

function updateDOM() {
  elements = vDOM.map(convert);
  document.body.replaceChildren(...elements);
  console.log(state);
}

function diff(previousVOM, currentVDOM) {
  //diffing function **TODO**
}
let elements, vDOM, prevVDOM;
vDOM = ["To-do", "In-Progress", "Finished"].map(generateColumn);

function changeTaskColumn(id, sourceColumnID, targetColumnID) {
  const task = state.tasks.get(id);
  task.columnID = targetColumnID;
  const sourceColumn = state.columns.get(sourceColumnID);
  const targetColumn = state.columns.get(targetColumnID);
  sourceColumn.children = sourceColumn.children.filter(
    (child) => child.id !== id,
  );
  targetColumn.children.push(task);
}
function changeColumnPosition(id, targetPositionID) {
  const sourceIndex = vDOM.findIndex((column) => column.id == id);
  const targetIndex = vDOM.findIndex((column) => column.id == targetPositionID);
  if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex)
    return;
  const [movedColumn] = vDOM.splice(sourceIndex, 1);
  vDOM.splice(targetIndex, 0, movedColumn);
}

updateDOM();
