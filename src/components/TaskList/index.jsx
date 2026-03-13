import { Task } from "../Task";

import style from "./index.module.css";

export const TaskList = ({ currentTodos, currentList }) => {
  return (
    <ul className={style.taskListContainer}>
      {currentTodos.map((task) => (
        <li key={task.id}>
          <Task {...task} currentList={currentList} />
        </li>
      ))}
    </ul>
  );
};
