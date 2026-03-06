export default function createColumn(title) {
  return {
    text: title,
    id: crypto.randomUUID(),
    type: "column",
    element: "div",
    children: [
      {
        title: title,
        element: "h2",
        type: "title",
      },
      {
        text: "Add task",
        element: "button",
        type: "add",
      },
    ],
  };
}
