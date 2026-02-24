import { Task } from "../Task";

import style from "./index.module.css";

export const TaskList = ({ currentTodos, currentList }) => {
  return (
    <ul className={style.taskListContainer}>
      {currentTodos.map(({ id, title, createdAdd, isCompleted }) => (
        <li key={id}>
          <Task
            date={createdAdd}
            value={title}
            id={id}
            isCompleted={isCompleted}
            currentList={currentList}
          />
        </li>
      ))}
    </ul>
  );
};
