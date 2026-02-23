import { useCallback } from "react";

import { Button } from "../../shared/Button";

import { ACTION_TYPES } from "../../constants";

import { FILTER_OPTIONS } from "../../constants";

import { useDispatch } from "../../hooks/useDispatch";

import style from "./index.module.css";

export const TaskControls = ({ currentList, setCurrentList }) => {
  const dispatch = useDispatch();

  const handleShowTodosCompleted = useCallback(
    (filterType) => {
      dispatch({
        type: ACTION_TYPES.TODOS_UPDATE_COMPLETED_FILTER,
      });
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
