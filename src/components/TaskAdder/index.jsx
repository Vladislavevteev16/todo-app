import { useEffect } from "react";

import { Button } from "../../shared/Button";

import { KEY_CODES } from "../../constants";

import style from "./index.module.css";

export const TaskAdder = ({
  handleCancelAddingTask,
  ref,
  handleInputChange,
  taskText,
  handleAddTask,
}) => {
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
      <Button onClick={handleAddTask} className={style.button}>
        Add new task
      </Button>
    </div>
  );
};
