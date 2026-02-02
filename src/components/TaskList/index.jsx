import { memo } from "react";

import { Task } from "../Task";

import style from "./index.module.css";

export const TaskList = memo(({ currentTodos, currentList }) => {
  return (
    <ul className={style.taskListContainer}>
      {currentTodos.map(({ id, text, createdAdd, isCompleted }) => (
        <li key={id}>
          <Task
            key={id}
            date={createdAdd}
            value={text}
            id={id}
            isCompleted={isCompleted}
            currentList={currentList}
          />
        </li>
      ))}
    </ul>
  );
});
