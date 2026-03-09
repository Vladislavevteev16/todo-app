import { requestTodos } from "../../api/todos/requestTodos";
import { ACTION_TYPES } from "../../constants";

export const getTasks = () => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.FETCH_START_ALL_TASKS });
    const { data } = await requestTodos.getAll();
    dispatch({ type: ACTION_TYPES.GET_TASKS, payload: data });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ACTION_TYPES.FETCH_ERROR,
      payload: e.response?.data?.message,
    });
  }
};

export const addTask = (value) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.FETCH_START_ADD_TASK });
    const { data } = await requestTodos.addTask({ title: value });
    dispatch({
      type: ACTION_TYPES.ADD_TASK,
      payload: { ...data, createdAdd: Date.now() },
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ACTION_TYPES.FETCH_ERROR,
      payload: e.response?.data?.message,
    });
  }
};
export const removeTask = (idTask) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.FETCH_START_REMOVE_TASK });
    const {
      data: { id },
    } = await requestTodos.deleteTask(idTask);
    dispatch({ type: ACTION_TYPES.REMOVE_TASK, payload: id });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ACTION_TYPES.FETCH_ERROR,
      payload: e.response?.data?.message,
    });
  }
};
export const taskToggleCompleted = (idTask) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.FETCH_START_TASK_TOGGLE });
    const { data } = await requestTodos.toggleTaskCompleted(idTask);
    const { id, isCompleted } = data[0];
    dispatch({
      type: ACTION_TYPES.TODO_TOGGLE_COMPLETED,
      payload: { id, isCompleted },
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ACTION_TYPES.FETCH_ERROR,
      payload: e.response?.data?.message,
    });
  }
};
export const removeTaskCompleted = (todosAll) => async (dispatch) => {
  try {
    const completedTodos = todosAll.filter((item) => item.isCompleted);
    dispatch({ type: ACTION_TYPES.FETCH_START_REMOVE_TASK });
    for (const { id } of completedTodos) {
      await requestTodos.deleteTask(id);
    }
    dispatch({ type: ACTION_TYPES.REMOVE_COMPLETED_TASKS });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ACTION_TYPES.FETCH_ERROR,
      payload: "Ошибка удаления выполненных тасок",
    });
  }
};

export const updateTaskTitle = (idTask, newText) => async (dispatch) => {
  try {
    dispatch({ type: ACTION_TYPES.FETCH_START_CREATE_TASK_VALUE });
    const response = await requestTodos.updateTaskTitle(idTask, newText);
    const { id, title } = response.data;
    dispatch({
      type: ACTION_TYPES.CREATE_TASK_VALUE,
      payload: { id, title },
    });
  } catch (e) {
    console.error(e);
    dispatch({
      type: ACTION_TYPES.FETCH_ERROR,
      payload: e.response?.data?.message,
    });
  }
};
