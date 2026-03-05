class Column extends Base {
  constructor(data) {
    super(data);
  }
}
class Task extends Base {
  constructor(data) {
    super(data);
  }
}
//functions for columns and tasks
class Base {
  constructor(data) {
    Object.assign(this, data);
  }
  handleDragover(e) {
    e.preventDefault();
  }
  handleDragStart(e) {
    e.stopPropagation();
    e.dataTransfer.setData("type", this.type);
    e.dataTransfer.setData("id", this.id);
  }
  handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");

    if (type == "task") {
      Board.shiftTask(this.id, id);
    } else if (type == "column") {
      Board.shiftColumn(this.id, id);
    }
  }
}
//functions for names, rename-able elements

//utility functions
const Board = {
  shiftTask(to, taskID) {
    const task = state.get(taskID);
    const sourceColumn = state.get(task.parentColumnID);
    sourceColumn.children = sourceColumn.children.filter(
      (a) => a.id != task.id,
    );

    const target = state.get(to);
    if (target.type == "column") {
      task.parentColumnID = to;
      target.children.push(task);
    } else if (target.type == "task") {
      const targetParent = state.get(target.parentColumnID);
      task.parentColumnID = targetParent.id;

      const targetIndex = targetParent.children.findIndex(
        (a) => a.id == target.id,
      );
      targetParent.children.splice(targetIndex, 0, task);
    }
  },
  shiftColumn(to, columnID) {
    const column = state.get(columnID);
    const target = state.get(to);

    if (target.type == "task") {
      this.shiftColumn(target.parentColumnID, columnID);
    } else if (target.type == "column") {
      const targetIndex = vDOM.findIndex((a) => a.id == target.id);
      vDOM = vDOM.filter((a) => a.id != column.id);
      vDOM.splice(targetIndex, 0, column);
    }
  },
  handleDblClick(e) {
    e.preventDefault();
    e.stopPropagation();
    //......
  },
  handleKeydown(e) {
    if (e.code == "Enter") {
      const newName = e.target.value;
      //......
    }
  },
};
