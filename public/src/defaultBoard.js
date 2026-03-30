const defaultBoard = {
  name: "default",
  board: {
    root: [1, 2, 3],
    elements: new Map(
      [
        1,
        {
          title: "To Do",
          id: 1,
          type: "column",
          element: "div",
          presenceOfTaskTemplate: false,
          children: [],
        },
      ],
      [
        2,
        {
          title: "In Progress",
          id: 2,
          type: "column",
          element: "div",
          presenceOfTaskTemplate: false,
          children: [],
        },
      ],
      [
        3,
        {
          title: "Completed",
          id: 3,
          type: "column",
          element: "div",
          presenceOfTaskTemplate: false,
          children: [],
        },
      ],
    ),
  },
};
export default defaultBoard;
