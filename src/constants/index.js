export const ACTION_TYPES = {
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

export const FILTER_OPTIONS = [
  { title: "All", filterType: "todosAll" },
  { title: "Completed", filterType: "completedTodos" },
];

export const FILTER_TYPES = {
  ALL: "todosAll",
  COMPLETED: "completedTodos",
};

export const KEY_CODES = {
  ENTER: "Enter",
  ESCAPE: "Escape",
};

export const SORTABLE_OPTIONS = [
  { value: "NEWEST", label: "Сначала новые" },
  { value: "OLDEST", label: "Сначала старые" },
  { value: "NAME_ASC", label: "По имени (А-Я)" },
  { value: "NAME_DESC", label: "По имени (Я-А)" },
];
