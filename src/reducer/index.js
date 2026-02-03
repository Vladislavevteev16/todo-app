import { v4 as uuid } from "uuid";

import { ACTION_TYPES } from "../constants";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_TASK:
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
    case ACTION_TYPES.REMOVE_TASK:
      return {
        ...state,
        todosAll: state.todosAll.filter((task) => task.id !== action.payload),
      };

    case ACTION_TYPES.TODO_TOGGLE_COMPLETED:
      return {
        ...state,
        todosAll: state.todosAll.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, isCompleted: action.payload.isCompleted }
            : todo;
        }),
      };
    case ACTION_TYPES.TODOS_UPDATE_COMPLETED_FILTER:
      return {
        ...state,
        completedTodos: state.todosAll.filter((todo) => todo.isCompleted),
      };
    case ACTION_TYPES.REMOVE_COMPLETED_TASKS:
      return {
        ...state,
        todosAll: state.todosAll.filter((todo) => !todo.isCompleted),
      };

    case ACTION_TYPES.CREATE_TASK_VALUE:
      return {
        ...state,
        todosAll: state.todosAll.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    case ACTION_TYPES.NEWEST:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) => b.createdAt - a.createdAt),
      };

    case ACTION_TYPES.OLDEST:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) => a.createdAt - b.createdAt),
      };
    case ACTION_TYPES.NAME_ASC:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) =>
          a.text.localeCompare(b.text, "ru", { sensitivity: "base" }),
        ),
      };
    case ACTION_TYPES.NAME_DESC:
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
