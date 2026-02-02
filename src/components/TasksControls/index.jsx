import { useCallback } from "react";

import { Button } from "../../shared/Button";

import { actions } from "../../actions";

import { useDispatch } from "../../hooks/useDispatch";

import style from "./index.module.css";

const filterButtons = [
  { title: "All", filterType: "todosAll" },
  { title: "Completed", filterType: "completedTodos" },
];

export const TaskControls = ({ currentList, setCurrentList }) => {
  const dispatch = useDispatch();

  const handleShowTodosCompleted = useCallback(
    (filterType) => {
      dispatch(actions.todosUpdateCompletedFilter());
      setCurrentList(filterType);
    },
    [dispatch, setCurrentList],
  );

  return (
    <div className={style.taskControlsContainer}>
      {filterButtons.map(({ title, filterType }, index) => (
        <Button
          onClick={() => {
            if (index == 0) {
              setCurrentList(filterType);
            }
            handleShowTodosCompleted(filterType);
          }}
          key={index}
          className={`${style.button} ${currentList === filterType ? style.buttonActive : ""}`}
        >
          {title}
        </Button>
      ))}
    </div>
  );
};
