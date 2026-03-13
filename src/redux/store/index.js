import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import todosReducer from "../slices/todosSlice";

import { requestTodos } from "../../api/todos/requestTodos";
import { requestAuth } from "../../api/auth/requestAuth";

const store = configureStore({
  reducer: { auth: authReducer, todos: todosReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: { requestTodos, requestAuth },
      },
    });
  },
});

export default store;
