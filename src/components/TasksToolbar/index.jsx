import { Button } from "../../shared/Button";

import { useSelector } from "react-redux";

import { FILTER_TYPES } from "../../constants";

import style from "./index.module.css";

export const TasksToolbar = ({
  handleStartAddingTask,
  handleRemoveAllTasks,

  currentList,
}) => {
  const todosAll = useSelector((state) => state.todos.todosAll);

  const todosCompletedLength = todosAll.filter(
    (todo) => todo.isCompleted,
  ).length;

  return (
    <div className={style.tasksToolbarContainer}>
      <h2>Tasks</h2>
      <div className={style.buttonContainer}>
        {!!todosCompletedLength && currentList === FILTER_TYPES.ALL && (
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
