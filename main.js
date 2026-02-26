"use strict";

function generateColumn(title) {
  return {
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
          { element: "button", type: "add", title: "Add task", children: [] },
        ],
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
  if (node.children != undefined) {
    element.append(...node.children.map(convert));
  }
  return element;
}

function updateDOM() {
  if (elements == undefined) {
    elements = vDOM.map(convert);
    document.body.append(...elements);
  } else {
    prevVDOM = [...vDOM];
    vDOM = ["to-do", "in-progress", "finished"].map(generateColumn);
    diff(prevVDOM, vDOM);
  }
}

function diff(previousVOM, currentVDOM) {
  //diffing function **TODO**
}
let elements, vDOM, prevVDOM;
vDOM = ["To-do", "In-Progress", "Finished"].map(generateColumn);

addTask(vDOM[0], "Wash Dishes", "need to wash dishes ASAP");
console.log(vDOM);
updateDOM();
