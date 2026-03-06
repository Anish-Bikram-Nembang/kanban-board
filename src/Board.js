import Column from "./Column.js";
import Task from "./Task.js";

export default function Board() {
  const board = {
    root: [],
    elements: new Map(),
    register(id, element) {
      this.elements.set(id, element);
    },
    createTask(parentColumnID, name, content) {
      const task = Task(parentColumnID, name, content);
      this.register(task.id, task);
      const parentColumn = this.elements.get(parentColumnID);
      parentColumn.children.push(task.id);
      return task;
    },
    createColumn(name) {
      const column = Column(name);
      this.register(column.id, column);
      this.root.push(column.id);
      return column;
    },
    createTaskTemplate() {},
    remove(id) {
      const element = this.elements.get(id);
      if (element.type == "column") {
        for (let child of element.children) {
          this.elements.delete(child);
        }
        this.root = this.root.filter((a) => a != element.id);
      } else if (element.type == "task") {
        const taskParent = this.elements.get(element.parentColumnID);
        taskParent.children = taskParent.children.filter(
          (a) => a != element.id,
        );
      }
      this.elements.delete(id);
    },
    shift(to, id) {
      const element = this.elements.get(id);
      const target = this.elements.get(to);

      if (element.type == "task") {
        const originalColumn = this.elements.get(element.parentColumnID);
        originalColumn.children = originalColumn.children.filter(
          (a) => a != element.id,
        );

        if (target.type == "column") {
          element.parentColumnID = to;
          target.children.push(element.id);
          //
        } else if (target.type == "task") {
          const targetParent = this.elements.get(target.parentColumnID);
          element.parentColumnID = targetParent.id;
          const targetIndex = targetParent.children.findIndex(
            (a) => a == target.id,
          );
          targetParent.children.splice(targetIndex, 0, element.id);
        }
      } else if (element.type == "column") {
        this.root = this.root.filter((a) => a != element.id);
        const targetIndex =
          target.type == "column"
            ? this.root.findIndex((a) => a == target.id)
            : this.root.findIndex((a) => a == target.parentColumnID);
        this.root.splice(targetIndex, 0, id);
      }
    },
  };
  return board;
}
