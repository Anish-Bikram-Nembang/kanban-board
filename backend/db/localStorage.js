export default lStorage = {
  save: async function (board) {
    localStorage.setItem(board.name, JSON.stringify(board.db));
  },
  load: async function (board) {
    return localStorage.getItem(board.name);
  },
};
