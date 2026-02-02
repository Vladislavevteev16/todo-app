import { createContext, useEffect, useMemo, useReducer } from "react";

import { reducer } from "../reducer";

export const TodosContext = createContext(null);
export const DispatchContext = createContext(null);

const initialState = { todosAll: [], completedTodos: [] };

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("todos")) || initialState,
  );

  const todosValue = useMemo(() => todos, [todos]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={todosValue}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};
