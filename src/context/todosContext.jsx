import { createContext, useMemo, useReducer } from "react";

import { reducer } from "../reducer/todosReducer";

export const TodosContext = createContext(null);
export const DispatchContext = createContext(null);

const initialState = {
  todosAll: [],
  completedTodos: [],
  loadingStates: {
    isAllTodosLoading: false,
    isAddTaskLoading: false,
    isRemoveTaskLoading: false,
    isTaskToggleLoading: false,
    isTaskChangeValueLoading: false,
  },
  error: null,
  message: null,
};

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const todosValue = useMemo(() => todos, [todos]);

  return (
    <TodosContext.Provider value={todosValue}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};
