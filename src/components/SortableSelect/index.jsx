import { useCallback } from "react";

import { Select, ConfigProvider } from "antd";

import { useTodos } from "../../hooks/useTodos";
import { useDispatch } from "../../hooks/useDispatch";

import { actions } from "../../actions";

import style from "./index.module.css";

const OPTIONS = [
  { value: "NEWEST", label: "Сначала новые" },
  { value: "OLDEST", label: "Сначала старые" },
  { value: "NAME_ASC", label: "По имени (А-Я)" },
  { value: "NAME_DESC", label: "По имени (Я-А)" },
];

export const SortSelect = ({ currentList }) => {
  const todos = useTodos();
  const dispatch = useDispatch();

  const handleChangeSort = useCallback(
    (value) => dispatch(actions.setNewest(value)),
    [dispatch],
  );

  return (
    todos.todosAll.length > 0 &&
    currentList !== "completedTodos" && (
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionFontSize: 10,
              optionHeight: 10,
              optionPadding: "10px 16px",
            },
          },
        }}
      >
        <Select
          className={style.select}
          defaultValue="NEWEST"
          onChange={handleChangeSort}
          options={OPTIONS}
        />
      </ConfigProvider>
    )
  );
};
