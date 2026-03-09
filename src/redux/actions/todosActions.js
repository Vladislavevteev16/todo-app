import { ACTION_TYPES } from "../../constants";


export const fetchStartAllTasks = () => ({
  type: ACTION_TYPES.FETCH_START_ALL_TASKS,
});

export const fetchStartAddTask = () => ({
  type: ACTION_TYPES.FETCH_START_ADD_TASK,
});

export const fetchStartRemoveTask = () => ({
  type: ACTION_TYPES.FETCH_START_REMOVE_TASK,
});

export const fetchStartTaskToggle = () => ({
  type: ACTION_TYPES.FETCH_START_TASK_TOGGLE,
});

export const fetchStartCreateTaskValue = () => ({
  type: ACTION_TYPES.FETCH_START_CREATE_TASK_VALUE,
});

export const fetchError = (errorMessage) => ({
  type: ACTION_TYPES.FETCH_ERROR,
  payload: errorMessage,
});

export const getTasks = (data) => ({
  type: ACTION_TYPES.GET_TASKS,
  payload: data,
});

export const addTask = (data) => ({
  type: ACTION_TYPES.ADD_TASK,
  paylaod: data,
});

export const removeTask = (id) => ({
  type: ACTION_TYPES.REMOVE_TASK,
  payload: id,
});

export const todoToggleCompleted = (id, isCompleted) => ({
  type: ACTION_TYPES.FETCH_START_CREATE_TASK_VALUE,
  payload: { id, isCompleted },
});

export const removeCompletedTasks = () => ({
  type: ACTION_TYPES.REMOVE_COMPLETED_TASKS,
});

export const createTaskValue = (id, title) => ({
  type: ACTION_TYPES.CREATE_TASK_VALUE,
  payload: { id, title },
});

export const todosUpdateCompletedFilter = () => ({
  type: ACTION_TYPES.TODOS_UPDATE_COMPLETED_FILTER,
});
export const getSortableValue = (type) => ({ type });
