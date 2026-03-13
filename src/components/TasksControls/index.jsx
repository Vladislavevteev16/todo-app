import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { Button } from "../../shared/Button";

import { todosUpdateCompletedFilter } from "../../redux/slices/todosSlice";

import { FILTER_OPTIONS } from "../../constants";

import style from "./index.module.css";

export const TaskControls = ({ currentList, setCurrentList }) => {
  const dispatch = useDispatch();

  const handleShowTodosCompleted = useCallback(
    (filterType) => {
      dispatch(todosUpdateCompletedFilter());
      setCurrentList(filterType);
    },
    [dispatch, setCurrentList],
  );

  return (
    <div className={style.taskControlsContainer}>
      {FILTER_OPTIONS.map(({ id, title, filterType }) => (
        <Button
          onClick={() => {
            if (id == 0) {
              setCurrentList(filterType);
            }
            handleShowTodosCompleted(filterType);
          }}
          key={id}
          className={`${style.button} ${currentList === filterType ? style.buttonActive : ""}`}
        >
          {title}
        </Button>
      ))}
    </div>
  );
};
