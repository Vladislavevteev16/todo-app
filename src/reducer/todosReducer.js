import { ACTION_TYPES } from "../constants";

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_START_ALL_TASKS: {
      return {
        ...state,
        loadingStates: { ...state.loadingStates, isAllTodosLoading: true },
      };
    }
    case ACTION_TYPES.FETCH_START_ADD_TASK: {
      return {
        ...state,
        loadingStates: { ...state.loadingStates, isAddTaskLoading: true },
      };
    }
    case ACTION_TYPES.FETCH_START_REMOVE_TASK: {
      return {
        ...state,
        loadingStates: { ...state.loadingStates, isRemoveTaskLoading: true },
      };
    }
    case ACTION_TYPES.FETCH_START_TASK_TOGGLE: {
      return {
        ...state,
        loadingStates: { ...state.loadingStates, isTaskToggleLoading: true },
      };
    }
    case ACTION_TYPES.FETCH_START_CREATE_TASK_VALUE: {
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          isTaskChangeValueLoading: true,
        },
      };
    }
    case ACTION_TYPES.FETCH_ERROR: {
      return { ...state, error: true, message: action.payload };
    }
    case ACTION_TYPES.GET_TASKS:
      return {
        ...state,
        todosAll: action.payload,
        loadingStates: { ...state.loadingStates, isAllTodosLoading: false },
      };
    case ACTION_TYPES.ADD_TASK:
      return {
        ...state,
        todosAll: [action.payload, ...state.todosAll],
        loadingStates: { ...state.loadingStates, isAddTaskLoading: false },
      };
    case ACTION_TYPES.REMOVE_TASK:
      return {
        ...state,
        todosAll: state.todosAll.filter((task) => task.id !== action.payload),
        loadingStates: { ...state.loadingStates, isRemoveTaskLoading: false },
      };
    case ACTION_TYPES.TODO_TOGGLE_COMPLETED:
      return {
        ...state,
        todosAll: state.todosAll.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, isCompleted: action.payload.isCompleted }
            : todo;
        }),
        loadingStates: { ...state.loadingStates, isTaskToggleLoading: false },
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
        loadingStates: { ...state.loadingStates, isRemoveTaskLoading: false },
      };
    case ACTION_TYPES.CREATE_TASK_VALUE:
      return {
        ...state,
        todosAll: state.todosAll.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, title: action.payload.title };
          }
          return todo;
        }),
        loadingStates: {
          ...state.loadingStates,
          isTaskChangeValueLoading: false,
        },
      };
    case ACTION_TYPES.NEWEST:
      return {
        ...state,
        todosAll: [...state.todosAll].sort(
          (a, b) => b.createdAdd - a.createdAdd,
        ),
      };

    case ACTION_TYPES.OLDEST:
      return {
        ...state,
        todosAll: [...state.todosAll].sort(
          (a, b) => a.createdAdd - b.createdAdd,
        ),
      };
    case ACTION_TYPES.NAME_ASC:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) =>
          a.title.localeCompare(b.title, "ru", { sensitivity: "base" }),
        ),
      };
    case ACTION_TYPES.NAME_DESC:
      return {
        ...state,
        todosAll: [...state.todosAll].sort((a, b) =>
          b.title.localeCompare(a.title, "ru", { sensitivity: "base" }),
        ),
      };
    default:
      return state;
  }
};
