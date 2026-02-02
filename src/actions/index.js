import { actionTypes } from "../reducer";

export const actions = {
  addTask: (payload) => ({ type: actionTypes.ADD_TASK, payload }),
  removeTask: (payload) => ({
    type: actionTypes.REMOVE_TASK,
    payload,
  }),
  todoToggleCompleted: (id, isCompleted) => ({
    type: actionTypes.TODO_TOGGLE_COMPLETED,
    payload: { id, isCompleted },
  }),
  todosUpdateCompletedFilter: () => ({
    type: actionTypes.TODOS_UPDATE_COMPLETED_FILTER,
  }),
  setNewest: (type) => ({ type }),
  removeCompletedTasks: () => ({
    type: actionTypes.REMOVE_COMPLETED_TASKS,
  }),
  createTaskValue: (id, text) => ({
    type: actionTypes.CREATE_TASK_VALUE,
    payload: { id, text },
  }),
};