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
