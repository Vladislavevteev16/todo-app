import { useEffect } from "react";

import { Button } from "../../shared/Button";
import { Loader } from "../../shared/Loader";

import { useTodos } from "../../hooks/useTodos";
import { KEY_CODES } from "../../constants";

import style from "./index.module.css";

export const TaskAdder = ({
  handleCancelAddingTask,
  ref,
  handleInputChange,
  taskText,
  handleAddTask,
}) => {
  const {
    loadingStates: { isAddTaskLoading },
    error,
    message,
  } = useTodos();

  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  const handleKeyDown = ({ key }) => {
    if (key === KEY_CODES.ENTER) {
      handleAddTask();
    }
  };

  return (
    <div className={style.taskAdderContainer}>
      <button onClick={handleCancelAddingTask} className={style.closedButton}>
        x
      </button>
      <h3>New task</h3>
      <input
        value={taskText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={ref}
        className={style.input}
        type="text"
        placeholder="Введите текст"
      />
      {error ? <h4>{message}</h4> : null}
      <Button onClick={handleAddTask} className={style.button}>
        {isAddTaskLoading ? (
          <Loader size={{ width: 30, height: 30 }} />
        ) : (
          "Add new task"
        )}
      </Button>
    </div>
  );
};
