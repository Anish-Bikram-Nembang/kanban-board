"use strict";

function generateColumn(title) {
  return {
    id: crypto.randomUUID(),
    type: "columns",
    element: "div",
    props: {},
    children: [
      {
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
              vDOM[0].children.push(generateTaskTemplate());
              updateDOM();
              console.log(vDOM);
            },
          },
        ],
      },
    ],
  };
}

function generateTaskTemplate() {
  return {
    title: "",
    element: "div",
    type: "task-template",
    props: {},
    children: [
      {
        title: "",
        element: "input",
        type: "task-title-input",
        props: {},
        children: [],
      },
      {
        title: "",
        element: "input",
        type: "task-content-input",
        props: {},
        children: [],
      },
      {
        title: "Add",
        element: "button",
        type: "task-add-btn",
        props: {},
        children: [],
      },
    ],
  };
}

function generateTask(title = "", content = "") {
  return {
    title: "",
    element: "div",
    type: "task",
    props: {},
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

function convert(node) {
  const element = document.createElement(node.element);
  element.classList.add(node.type);
  element.textContent = node.title;
  element.onclick = node.handleClick;
  if (node.children != undefined) {
    element.append(...node.children.map(convert));
  }
  return element;
}

function updateDOM() {
  // if (elements == undefined) {
  elements = vDOM.map(convert);
  document.body.replaceChildren(...elements);
  // } else {
  //   prevVDOM = [...vDOM];
  //   diff(prevVDOM, vDOM);
  //  }
}

function diff(previousVOM, currentVDOM) {
  //diffing function **TODO**
}
let elements, vDOM, prevVDOM;
vDOM = ["To-do", "In-Progress", "Finished"].map(generateColumn);

addTask(vDOM[0], "Wash Dishes", "need to wash dishes ASAP");
console.log(vDOM);
updateDOM();
