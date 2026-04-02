import { fetchwrapper } from "./fetchWrapper";

const baseUrl = "/api/tasks/";

export const createTask = async (column_id, name, description) => {
  try {
    const createdTask = await fetchwrapper(`${baseUrl}`, {
      method: "POST",
      body: JSON.stringify({
        column_id,
        name,
        description,
      }),
    });
    return createdTask;
  } catch (err) {
    alert("Failed to create task");
  }
};
export const getTasks = async () => {
  try {
    const tasks = await fetchwrapper(`${baseUrl}`, {
      method: "GET",
    });
    return tasks;
  } catch (err) {
    alert("Failed to get tasks");
  }
};
export const getTaskById = async (id) => {
  try {
    const task = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "GET",
    });
    return task;
  } catch (err) {
    alert("Failed to get task");
  }
};
export const updateTask = async (id, { newName, newDesc, position }) => {
  try {
    const updatedTask = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        newName,
        newDesc,
        position,
      }),
    });
    return updatedTask;
  } catch (err) {
    alert("Failed to update task");
  }
};
export const deleteTask = async (id) => {
  try {
    const deletedTask = await fetchwrapper(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    return deletedTask;
  } catch (err) {
    alert("Failed to delete task");
  }
};
