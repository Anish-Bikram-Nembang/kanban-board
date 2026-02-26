"use strict";

function generateColumn(title) {
  return {
    title: title,
    type: "column",
    element: "div",
    props: {},
    children: [],
  };
}

function generateTask(title = "", content = "") {
  return {
    title: title,
    type: "task",
    content: content,
    element: "div",
    props: {},
    children: [],
  };
}

function addTask(column, title, content) {
  let task = generateTask(title, content);
  column.children.push(task);
}

function convert(node) {
  const element = document.createElement(node.element);
  const title =
    node.type === "column"
      ? document.createElement("h2")
      : document.createElement("h4");
  title.textContent = node.title;
  element.append(title);
  console.log(node.children);
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
vDOM = ["to-do", "in-progress", "finished"].map(generateColumn);

addTask(vDOM[0], "Wash Dishes", "need to wash dishes ASAP");
console.log(vDOM);
updateDOM();
