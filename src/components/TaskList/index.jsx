import { Task } from "../Task";

import style from "./index.module.css";

export const TaskList = ({ currentTodos, currentList }) => {
  return (
    <ul className={style.taskListContainer}>
      {currentTodos.map(({ id, text, createdAdd, isCompleted }) => (
        <li key={id}>
          <Task
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
};
