import { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Select, ConfigProvider } from "antd";
import { getSortableValue } from "../../redux/actions/todosActions";

import { SORTABLE_OPTIONS } from "../../constants";
import { FILTER_TYPES } from "../../constants";

const OPTIONS_STYLE = {
  optionFontSize: 10,
  optionHeight: 10,
  optionPadding: "10px 16px",
};

import style from "./index.module.css";

export const SortableSelect = memo(({ currentList }) => {
  const todosAll = useSelector((state) => state.todos.todosAll);
  const dispatch = useDispatch();

  const handleChangeSort = useCallback(
    (value) => dispatch(getSortableValue(value)),
    [dispatch],
  );

  if (todosAll.length === 0) {
    return null;
  }

  if (currentList === FILTER_TYPES.COMPLETED) return null;

  return (
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
  );
});
