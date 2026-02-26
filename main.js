"use strict";

function generateColumn(title) {
  const column = {
    id: crypto.randomUUID(),
    type: "columns",
    element: "div",
    props: {},
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
        handleInput() {
          this.inputValue = "";
        },
      },
      {
        title: "",
        element: "input",
        type: "task-content-input",
        props: {},
        children: [],
        handleInput() {
          this.inputValue = "";
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
  element.onInput = node.handleInput;
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

addTask(vDOM[0], "Wash Dishes", "need to wash dishes ASAP");
console.log(vDOM);
updateDOM();
