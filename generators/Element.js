const Board = new Map();

class Element {
  constructor(name, type, parent = null) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.parent = parent;
    this.parent.children.push(this);
    this.children = [];
    this.registerElement(this.id, this);
  }
  registerElement(id, obj) {
    Board.set(id, obj);
  }
  addChild(child) {
    this.children.push(child);
  }
  removeChild(childID) {
    this.children = this.children.filter((child) => child.id !== childID);
  }
  moveTo(newParentID) {
    const newParent = Board.get(newParentID);
    this.parent.removeChild(this.id);
    this.parent = newParent;
    newParent.addChild(this);
  }
  rename(newName) {
    this.name = newName;
  }
}

class Column extends Element {
  constructor(name) {
    super(name, "column");
  }
}
class Task extends Element {
  constructor(name, content, parentColumn) {
    super(name, "task", parentColumn);
    this.content = content;
  }
}

//todo
function render(node) {
  const element = document.createElement("div");
  element.classList.add(node.type);
  element.id = node.id;
  switch (node.type) {
    case "column":
      break;
    case "task":
      break;
  }
}
