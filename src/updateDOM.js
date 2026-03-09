export default function updateDOM(board) {
  diff(board);
  board.prevState = {
    root: [...board.root],
    elements: new Map(board.elements),
  };
}

function diff(board) {
  if (board.prevState.root.length != board.root.length) {
    return true;
  }
  //Check column order
  for (let i = 0; i < currState.root.length; i++) {
    if (prevState.root[i] != currState.root[i]) {
      return true;
    }
    if (isDifferentColumn(board, i)) {
      return true;
    }
  }
  return false;
}
function isDifferentColumn(board, i) {
  const prevColumn = board.prevState.elements.get(board.prevState.root[i]);
  const currColumn = board.elements.get(board.root[i]);

  if (
    prevColumn.presenceOfTaskTemplate != currColumn.presenceOfTaskTemplate ||
    prevColumn.children.length != currColumn.children.length ||
    prevColumn.title != currColumn.title
  ) {
    return true;
  }
  //check task order
  for (let i = 0; i < currColumn.children.length; i++) {
    if (prevColumn.children[i] != currColumn.children[i]) {
      return true;
    }
    if (isDifferentTask(board, currColumn.children[i])) {
      return true;
    }
  }
  return false;
}
function isDifferentTask(board, taskID) {
  let prevTask = board.prevState.elements.get(taskID);
  let currTask = board.elements.get(taskID);
  if (
    prevTask.title != currTask.title ||
    prevTask.content != currTask.content
  ) {
    return true;
  }
  return false;
}
