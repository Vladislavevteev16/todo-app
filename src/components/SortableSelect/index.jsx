import { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Select, ConfigProvider } from "antd";

import {
  nameasc,
  namedesc,
  newest,
  oldest,
} from "../../redux/slices/todosSlice";

import { ACTION_TYPES, SORTABLE_OPTIONS } from "../../constants";
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
    (value) => {
      switch (value) {
        case ACTION_TYPES.NEWEST:
          dispatch(newest());
          break;
        case ACTION_TYPES.OLDEST:
          dispatch(oldest());
          break;
        case ACTION_TYPES.NAME_ASC:
          dispatch(nameasc());
          break;
        case ACTION_TYPES.NAME_DESC:
          dispatch(namedesc());
          break;
      }
    },
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
