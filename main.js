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
function generateColumn(title) {
  const column = {
    id: crypto.randomUUID(),
    presenceOfTaskTemplate: false,
    type: "columns",
    element: "div",
    handleDrop: function (e) {
      e.preventDefault();
      const title = e.dataTransfer.getData("title");
      const id = e.dataTransfer.getData("id");
      const content = e.dataTransfer.getData("content");
      const element = generateTask(title, content);
      this.children.push(element);
      removeTask(id);
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
      column.children.push(generateTask(taskTitle, taskContent));
      column.presenceOfTaskTemplate = false;
      updateDOM();
    };
    return taskTemplate;
  };
  column.children.push(children);
  return column;
}

function generateTask(title = "", content = "") {
  const task = {
    id: crypto.randomUUID(),
    title: "",
    element: "div",
    type: "task",
    handleDragStart: function (e) {
      e.dataTransfer.setData("title", e.target.children[0].textContent);
      e.dataTransfer.setData("content", e.target.children[1].textContent);
      e.dataTransfer.setData("id", e.target.id);
      //updateDOM();
    },
    children: [
      {
        title: title,
        type: "task-title",
        element: "h4",
        children: [],
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
  return task;
}

function addTask(column, title, content) {
  let task = generateTask(title, content);
  column.children.push(task);
}
function addProps(element, props) {
  // const attributes = props.fiter(isAttribute);
  // const styles = props.filter(isStyle);
  // const handlers = props.filter(isHandler);
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
}

function diff(previousVOM, currentVDOM) {
  //diffing function **TODO**
}
let elements, vDOM, prevVDOM;
vDOM = ["To-do", "In-Progress", "Finished"].map(generateColumn);

function removeTask(id) {
  for (const column of vDOM) {
    column.children = column.children.filter((child) => child.id != id);
  }
}
console.log(vDOM);
updateDOM();
