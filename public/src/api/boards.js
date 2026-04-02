import { fetchwrapper } from "./fetchWrapper";

const baseUrl = "/api/boards/";

export const createBoard = async (name) => {
  try {
    const createdBoard = await fetchwrapper(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
    });
    return createdBoard;
  } catch (err) {
    alert("Failed to create board");
  }
};
export const getColumnsByBoard = async () => {};
export const getBoards = async () => {
  try {
    const boards = await fetchwrapper(`${baseUrl}`, {
      method: "GET",
    });
    return boards;
  } catch (err) {
    alert("Failed to get boards");
  }
};
export const getBoardById = async (id) => {
  try {
    const board = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "GET",
    });
    return board;
  } catch (err) {
    alert("Failed to get board");
  }
};
export const updateBoard = async (id, { newName }) => {
  try {
    const updatedBoard = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        newName,
      }),
    });
    return updatedBoard;
  } catch (err) {
    alert("Failed to update board");
  }
};
export const deleteBoard = async (id) => {
  try {
    const deletedBoard = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    return deletedBoard;
  } catch (err) {
    alert("Failed to delete board");
  }
};
