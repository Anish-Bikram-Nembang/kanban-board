export default function createColumn(title) {
  return {
    title,
    id: crypto.randomUUID(),
    type: "column",
    element: "div",
    children: [],
  };
}
