import { Button } from "../../shared/Button";

import style from "./index.module.css";

export const TasksToolbar = ({
  handleStartAddingTask,
  handleRemoveAllTasks,
  todos,
  currentList,
}) => {
  const todosCompletedLength = todos.todosAll.filter(
    (todo) => todo.isCompleted,
  ).length;

  return (
    <div className={style.tasksToolbarContainer}>
      <h2>Tasks</h2>
      <div className={style.buttonContainer}>
        {!!todosCompletedLength && currentList === "todosAll" && (
          <Button onClick={handleRemoveAllTasks} className={style.buttonRemove}>
            Remove tasks ({todosCompletedLength})
          </Button>
        )}
        <Button onClick={handleStartAddingTask} className={style.buttonAdd}>
          Add task
        </Button>
      </div>
    </div>
  );
};
