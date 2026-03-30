import defaultBoard from "./defaultBoard.js";

const lStorage = {
  save: async function (board) {
    localStorage.setItem(board.name, JSON.stringify(board));
  },
  load: async function (board) {
    return localStorage.getItem(board.name);
  },
};
lStorage.save(defaultBoard);

export default lStorage;
