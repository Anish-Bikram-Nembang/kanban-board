export function createTask(parentColumnID, title, content) {
  return {
    id: crypto.randomUUID(),
    type: "task",
    parentColumnID,
    element: "div",
    children: [
      {
        text: title,
        type: "task-title",
        element: "div",
        children: [
          {
            element: "button",
            type: "remove",
            title: "✗",
          },
        ],
      },
      {
        text: content,
        type: "task-content",
        element: "p",
      },
    ],
  };
}
