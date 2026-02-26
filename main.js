"use strict";
//root node

function generateColumn(title) {
  return {
    title: title,
    type: "div",
    props: {},
    children: [],
  };
}
function generateTask(title = "", content = "") {
  return {
    title: title,
    content: content,
    type: "div",
    props: {},
  };
}

const columns = [
  generateColumn("to-do"),
  generateColumn("in-progress"),
  generateColumn("finished"),
];

function addTask(column, title, content) {
  let task = generateTask(title, content);
  column.children.push(task);
}
addTask(columns[0], "Wash Dishes", "need to wash dishes ASAP");

console.log(columns);
