import Column from "./Factory/Column.js";
import Task from "./Factory/Task.js";
import renderColumn from "./Renderers/renderColumn.js";
import renderTask from "./Renderers/renderTask.js";
import localStorage from "./defaultBoard.js";

export default function Board() {
  const board = {
    prevState: {},
    root: [],
    DOM: new Map(),
    elements: new Map(),
    register(id, element) {
      this.elements.set(id, element);
    },
    load: async function () {
      const response = await fetch("/getdata");
      const data = await response.json();
      if (!response.ok) {
        alert("Data load failed");
        return;
      }
      const { root, elements } = data;
      this.root = root;
      this.elements = new Map(elements);
    },
    save: async function () {
      const response = await fetch("/savedata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            root: this.root,
            elements: Array.from(this.elements.entries()),
          },
          null,
          2,
        ),
      });
      if (!response.ok) {
        alert("Data save failed");
        return;
      }
      console.log("Data saved in database");
    },
    async createTask(parentColumnID, name, content) {
      const task = Task(parentColumnID, name, content);
      this.register(task.id, task);
      const parentColumn = this.elements.get(parentColumnID);
      parentColumn.children.push(task.id);
      const taskElem = renderTask(board, task);
      const parentColumnElem = document.getElementById(parentColumnID);
      parentColumnElem.insertAdjacentElement("beforeend", taskElem);
      await this.save();
      return task;
    },
    async createColumn(name) {
      const column = Column(name);
      this.register(column.id, column);
      this.root.push(column.id);

      const columnElem = renderColumn(this, column);
      const container = document.getElementsByClassName("container")[0];
      container.insertBefore(
        columnElem,
        container.children[container.children.length - 1],
      );
      await this.save();
      return column;
    },
    async remove(id) {
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
      const domNode = document.getElementById(id);
      domNode.remove();
      await this.save();
    },
    async shiftTask(to, id) {
      const element = this.elements.get(id);
      const target = this.elements.get(to);

      const originalColumn = this.elements.get(element.parentColumnID);
      const sourceIndex = originalColumn.children.findIndex(
        (a) => a == element.id,
      );
      originalColumn.children = originalColumn.children.filter(
        (a) => a != element.id,
      );

      const nodeToShift = document.getElementById(id);
      if (target.type == "column") {
        element.parentColumnID = to;
        target.children.push(element.id);
        const targetNode = document.getElementById(to);
        targetNode.insertAdjacentElement("beforeend", nodeToShift);
        await board.save();

        //
      } else if (target.type == "task") {
        const targetParent = this.elements.get(target.parentColumnID);
        const targetIndex = targetParent.children.findIndex(
          (a) => a == target.id,
        );
        const targetNode = document.getElementById(to);
        const parentNode = document.getElementById(targetParent.id);
        if (target.parentColumnID == element.parentColumnID) {
          if (targetIndex < sourceIndex) {
            targetParent.children.splice(targetIndex, 0, id);
            parentNode.insertBefore(nodeToShift, targetNode);
            await this.save();
            return;
          } else {
            targetParent.children.splice(targetIndex + 1, 0, id);
            targetNode.insertAdjacentElement("afterend", nodeToShift);
            await this.save();
            return;
          }
        } else {
          element.parentColumnID = targetParent.id;
          targetParent.children.splice(targetIndex, 0, element.id);
          targetNode.insertAdjacentElement("beforebegin", nodeToShift);
          await this.save();
        }
      }
    },
    async shiftColumn(to, id) {
      const target = this.elements.get(to);

      const sourceIndex = this.root.findIndex((a) => a == id);
      this.root.splice(sourceIndex, 1);
      const targetIndex =
        target.type == "column"
          ? this.root.findIndex((a) => a == target.id)
          : this.root.findIndex((a) => a == target.parentColumnID);
      if (targetIndex < sourceIndex) {
        this.root.splice(targetIndex, 0, id);
      } else {
        this.root.splice(targetIndex + 1, 0, id);
      }
      const targetNode =
        target.type == "column"
          ? document.getElementById(to)
          : document.getElementById(target.parentColumnID);
      const nodeToShift = document.getElementById(id);
      if (targetIndex < sourceIndex) {
        targetNode.insertAdjacentElement("beforebegin", nodeToShift);
      } else {
        targetNode.insertAdjacentElement("afterend", nodeToShift);
      }
      await this.save();
    },
  };
  //If not logged in
  if (1) {
    const dboard = JSON.parse(localStorage.getItem("default"));
    board.root = dboard.board.root;
    board.elements = dboard.board.elements;
  }

  return board;
}
