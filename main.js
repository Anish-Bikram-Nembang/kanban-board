"use strict";

function generateColumn(title) {
  const column = {
    id: crypto.randomUUID(),
    type: "columns",
    element: "div",
    props: {
      draggable: "true",
    },
    children: [],
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
          column.children.push(column.generateTaskTemplate());
          updateDOM();
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
      updateDOM();
    };
    return taskTemplate;
  };

  column.children.push(children);
  return column;
}

function generateTask(title = "", content = "") {
  return {
    title: "",
    element: "div",
    type: "task",
    props: {
      draggable: "true",
    },

    children: [
      {
        title: title,
        type: "task-title",
        element: "h4",
        props: {},
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
}

function addTask(column, title, content) {
  let task = generateTask(title, content);
  column.children.push(task);
}
function addProps(element, props) {
  for (const key in props) {
    element.setAttribute(key, props[key]);
  }
}

function convert(node) {
  const element = document.createElement(node.element);
  element.classList.add(node.type);
  element.textContent = node.title;
  element.onclick = node.handleClick;
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

console.log(vDOM);
updateDOM();

function dragstartHandler(ev) {
  // Add different types of drag data
  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.setData(
    "text/uri-list",
    ev.target.ownerDocument.location.href,
  );
}
// function handleDragStart(e){
//   e.dataTransfer.setData("title", e.target.)
// }
