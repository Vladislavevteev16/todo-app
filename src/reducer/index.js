import { v4 as uuid } from "uuid";

export const actionTypes = {
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  TODO_TOGGLE_COMPLETED: "TODO_TOGGLE_COMPLETED",
  TODOS_UPDATE_COMPLETED_FILTER: "TODOS_UPDATE_COMPLETED_FILTER",
  REMOVE_COMPLETED_TASKS: "REMOVE_COMPLETED_TASKS",
  CREATE_TASK_VALUE: "CREATE_TASK_VALUE",
  NEWEST: "NEWEST",
  OLDEST: "OLDEST",
  NAME_ASC: "NAME_ASC",
  NAME_DESC: "NAME_DESC",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return {
        ...state,
        todosAll: [
          {
            id: uuid(),
            text: action.payload,
            createdAt: Date.now(),
            isCompleted: false,
          },
          ...state.todosAll,
        ],
      };
    case actionTypes.REMOVE_TASK:
      return {
        ...state,
        todosAll: state.todosAll.filter((task) => task.id !== action.payload),
      };

    case actionTypes.TODO_TOGGLE_COMPLETED:
      return {
        ...state,
        todosAll: state.todosAll.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, isCompleted: action.payload.isCompleted }
            : todo;
        }),
      };
    case actionTypes.TODOS_UPDATE_COMPLETED_FILTER:
      return {
        ...state,
        completedTodos: state.todosAll.filter((todo) => todo.isCompleted),
      };
    case actionTypes.REMOVE_COMPLETED_TASKS:
      return {
        ...state,
        todosAll: state.todosAll.filter((todo) => !todo.isCompleted),
      };

    case actionTypes.CREATE_TASK_VALUE:
      return {
        ...state,
        todosAll: state.todosAll.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    case actionTypes.NEWEST:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) => b.createdAt - a.createdAt),
      };

    case actionTypes.OLDEST:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) => a.createdAt - b.createdAt),
      };
    case actionTypes.NAME_ASC:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) =>
          a.text.localeCompare(b.text, "ru", { sensitivity: "base" }),
        ),
      };
    case actionTypes.NAME_DESC:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) =>
          b.text.localeCompare(a.text, "ru", { sensitivity: "base" }),
        ),
      };
    default:
      return state;
  }
};
