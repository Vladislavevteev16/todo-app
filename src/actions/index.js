import { ACTION_TYPES } from "../constants";

export const actions = {
  addTask: (payload) => ({ type: ACTION_TYPES.ADD_TASK, payload }),
  removeTask: (payload) => ({
    type: ACTION_TYPES.REMOVE_TASK,
    payload,
  }),
  todoToggleCompleted: (id, isCompleted) => ({
    type: ACTION_TYPES.TODO_TOGGLE_COMPLETED,
    payload: { id, isCompleted },
  }),
  todosUpdateCompletedFilter: () => ({
    type: ACTION_TYPES.TODOS_UPDATE_COMPLETED_FILTER,
  }),
  setNewest: (type) => ({ type }),
  removeCompletedTasks: () => ({
    type: ACTION_TYPES.REMOVE_COMPLETED_TASKS,
  }),
  createTaskValue: (id, text) => ({
    type: ACTION_TYPES.CREATE_TASK_VALUE,
    payload: { id, text },
  }),
};
