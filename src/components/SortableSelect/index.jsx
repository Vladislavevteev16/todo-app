import { useCallback, memo } from "react";

import { Select, ConfigProvider } from "antd";

import { useTodos } from "../../hooks/useTodos";
import { useDispatch } from "../../hooks/useDispatch";

import { SORTABLE_OPTIONS } from "../../constants";
import { FILTER_TYPES } from "../../constants";

const OPTIONS_STYLE = {
  optionFontSize: 10,
  optionHeight: 10,
  optionPadding: "10px 16px",
};

import style from "./index.module.css";

export const SortableSelect = memo(({ currentList }) => {
  const todos = useTodos();
  const dispatch = useDispatch();

  const handleChangeSort = useCallback(
    (value) => dispatch({ type: value }),
    [dispatch],
  );

  return (
    todos.todosAll.length > 0 &&
    currentList !== FILTER_TYPES.COMPLETED && (
      <ConfigProvider
        theme={{
          components: {
            Select: OPTIONS_STYLE,
          },
        }}
      >
        <Select
          className={style.select}
          defaultValue={SORTABLE_OPTIONS[0].label}
          onChange={handleChangeSort}
          options={SORTABLE_OPTIONS}
        />
      </ConfigProvider>
    )
  );
});
