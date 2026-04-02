import { fetchwrapper } from "./fetchWrapper";

const baseUrl = "/api/columns/";

export const createColumn = async (board_id, name) => {
  try {
    const createdColumn = await fetchwrapper(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        board_id,
        name,
      }),
    });
    return createdColumn;
  } catch (err) {
    alert("Failed to create column");
  }
};
export const getTaskByColumn = async () => {};
export const getColumns = async () => {
  try {
    const columns = await fetchwrapper(`${baseUrl}`, {
      method: "GET",
    });
    return columns;
  } catch (err) {
    alert("Failed to get columns");
  }
};
export const getColumnById = async (id) => {
  try {
    const column = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "GET",
    });
    return column;
  } catch (err) {
    alert("Failed to get column");
  }
};
export const updateColumn = async (id, { newName, position }) => {
  try {
    const updatedColumn = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        newName,
        position,
      }),
    });
    return updatedColumn;
  } catch (err) {
    alert("Failed to update column");
  }
};
export const deleteColumn = async (id) => {
  try {
    const deletedColumn = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    return deletedColumn;
  } catch (err) {
    alert("Failed to delete column");
  }
};
