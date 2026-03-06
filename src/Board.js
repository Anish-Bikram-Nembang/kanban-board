import Column from "./Column.js";
import Task from "./Task.js";

export default function Board() {
  const board = {
    root: [],
    elements: new Map(),
    register(id, element) {
      this.elements.set(id, element);
    },
    load: async function () {
      const response = await fetch("/root");
      if (!response.ok) {
        alert("Data load failed");
        return;
      }
      let { root, elements } = await response.json();
      if (this.root.length <= 0) {
        this.root = root;
        this.elements = new Map(elements);
      } else {
        //ask User to confirm or save changes ****
      }
    },
    save: async function () {
      const response = await fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          root: this.root,
          elements: Array.from(this.elements.entries()),
        }),
      });
      if (!response.ok) {
        alert("Data save failed");
        return;
      }
      console.log("Data saved in database");
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
    shiftTask(to, id) {
      const element = this.elements.get(id);
      const target = this.elements.get(to);

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
    },
    shiftColumn(to, id) {
      const element = this.elements.get(id);
      const target = this.elements.get(to);

      this.root = this.root.filter((a) => a != element.id);
      const targetIndex =
        target.type == "column"
          ? this.root.findIndex((a) => a == target.id)
          : this.root.findIndex((a) => a == target.parentColumnID);
      this.root.splice(targetIndex, 0, id);
    },
  };
  return board;
}
