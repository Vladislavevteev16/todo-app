import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FETCH_ERROR_MESSAGE } from "../../constants";

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

export const getTasks = createAsyncThunk(
  "todos/getTasks",
  async (_, { extra, rejectWithValue }) => {
    const { requestTodos } = extra;
    try {
      const { data } = await requestTodos.getAll();

      return data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || FETCH_ERROR_MESSAGE.GET_ALL_ERROR_MSG,
      );
    }
  },
);

export const addTask = createAsyncThunk(
  "todos/addTask",
  async (title, { extra, rejectWithValue }) => {
    const { requestTodos } = extra;
    try {
      const { data } = await requestTodos.addTask({ title });

      return data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || FETCH_ERROR_MESSAGE.ADD_TASK_ERROR_MSG,
      );
    }
  },
);

export const removeTask = createAsyncThunk(
  "todos/removeTask",
  async (idTask, { extra, rejectWithValue }) => {
    const { requestTodos } = extra;
    try {
      const {
        data: { id },
      } = await requestTodos.deleteTask(idTask);

      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || FETCH_ERROR_MESSAGE.REMOVE_TASK_ERROR_MSG,
      );
    }
  },
);

export const taskToggleCompleted = createAsyncThunk(
  "todos/taskToggleCompleted",
  async (idTask, { extra, rejectWithValue }) => {
    const { requestTodos } = extra;
    try {
      const { data } = await requestTodos.toggleTaskCompleted(idTask);

      const { id, isCompleted } = data[0];

      return { id, isCompleted };
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
          FETCH_ERROR_MESSAGE.TOGGLE_STATUS_ERROR_MSG,
      );
    }
  },
);

export const removeTaskCompleted = createAsyncThunk(
  "todos/removeTaskCompleted",
  async (todosAll, { extra, rejectWithValue }) => {
    const { requestTodos } = extra;
    const completedTodos = todosAll.filter((item) => item.isCompleted);

    try {
      await Promise.all(
        completedTodos.map(({ id }) => requestTodos.deleteTask(id)),
      );
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message ||
          FETCH_ERROR_MESSAGE.REMOVE_COMPLETED_ERROR_MSG,
      );
    }
  },
);

export const updateTaskTitle = createAsyncThunk(
  "todos/updateTaskTitle",
  async ({ id: idTask, text }, { extra, rejectWithValue }) => {
    const { requestTodos } = extra;

    try {
      const {
        data: { id, title },
      } = await requestTodos.updateTaskTitle(idTask, text);

      return { id, title };
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || FETCH_ERROR_MESSAGE.UPDATE_TITLE_ERROR_MSG,
      );
    }
  },
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todosUpdateCompletedFilter(state) {
      state.completedTodos = state.todosAll.filter((item) => item.isCompleted);
    },
    newest(state) {
      state.todosAll = [...state.todosAll].sort(
        (a, b) => a.createdAdd - b.createdAdd,
      );
    },
    oldest(state) {
      state.todosAll = [...state.todosAll].sort(
        (a, b) => b.createdAdd - a.createdAdd,
      );
    },
    nameasc(state) {
      state.todosAll = [...state.todosAll].sort((a, b) =>
        a.title.localeCompare(b.title, "ru", { sensitivity: "base" }),
      );
    },
    namedesc(state) {
      state.todosAll = [...state.todosAll].sort((a, b) =>
        b.title.localeCompare(a.title, "ru", { sensitivity: "base" }),
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loadingStates.isAllTodosLoading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.todosAll = action.payload;
      state.loadingStates.isAllTodosLoading = false;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loadingStates.isAllTodosLoading = false;
    });
    builder.addCase(addTask.pending, (state) => {
      state.loadingStates.isAddTaskLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.todosAll.push({ ...action.payload, createdAdd: Date.now() });
      state.loadingStates.isAddTaskLoading = false;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loadingStates.isAddTaskLoading = false;
    });
    builder.addCase(removeTask.pending, (state) => {
      state.loadingStates.isRemoveTaskLoading = true;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.todosAll = state.todosAll.filter(
        (item) => item.id !== action.payload,
      );
      state.loadingStates.isRemoveTaskLoading = false;
    });
    builder.addCase(removeTask.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loadingStates.isRemoveTaskLoading = false;
    });
    builder.addCase(taskToggleCompleted.pending, (state) => {
      state.loadingStates.isTaskToggleLoading = true;
    });
    builder.addCase(taskToggleCompleted.fulfilled, (state, action) => {
      const { id, isCompleted } = action.payload;
      const taskCompleted = state.todosAll.find((item) => item.id === id);

      if (taskCompleted) {
        taskCompleted.isCompleted = isCompleted;
      }
      state.loadingStates.isTaskToggleLoading = false;
    });
    builder.addCase(taskToggleCompleted.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loadingStates.isTaskToggleLoading = false;
    });
    builder.addCase(removeTaskCompleted.pending, (state) => {
      state.loadingStates.isRemoveTaskLoading = true;
    });
    builder.addCase(removeTaskCompleted.fulfilled, (state) => {
      state.todosAll = state.todosAll.filter((item) => !item.isCompleted);
      state.loadingStates.isRemoveTaskLoading = false;
    });
    builder.addCase(removeTaskCompleted.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loadingStates.isRemoveTaskLoading = false;
    });
    builder.addCase(updateTaskTitle.pending, (state) => {
      state.loadingStates.isTaskChangeValueLoading = true;
    });
    builder.addCase(updateTaskTitle.fulfilled, (state, action) => {
      const { id, title } = action.payload;

      const task = state.todosAll.find((item) => item.id === id);

      if (task) {
        task.title = title;
      }
      state.loadingStates.isTaskChangeValueLoading = false;
    });
    builder.addCase(updateTaskTitle.rejected, (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loadingStates.isTaskChangeValueLoading = false;
    });
  },
});

export const { todosUpdateCompletedFilter, nameasc, namedesc, newest, oldest } =
  todosSlice.actions;

export default todosSlice.reducer;
