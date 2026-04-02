export default function createTask(parentColumnID, title, content) {
  return {
    id: crypto.randomUUID(),
    title,
    content,
    type: "task",
    parentColumnID,
    element: "div",
  };
}
