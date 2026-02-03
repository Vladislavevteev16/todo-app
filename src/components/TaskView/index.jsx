import { useCallback, useMemo, useRef } from "react";

import { TaskControls } from "../TasksControls";
import { TasksToolbar } from "../TasksToolbar";
import { TaskAdder } from "../TaskAdder";
import { TaskList } from "../TaskList";
import { EmptyTasks } from "../EmptyTasks";
import { SortableSelect } from "../SortableSelect";

import { actions } from "../../actions";

import { FILTER_TYPES } from "../../constants";

import { useTodos } from "../../hooks/useTodos";
import { useDispatch } from "../../hooks/useDispatch";

import { useTaskAdding } from "../../hooks/useTaskAdding";

import { triggerErrorAnimation } from "../../utils/triggerErrorAnimation";

import style from "./index.module.css";

export const TaskView = () => {
  const {
    taskText,
    setTaskText,
    isAddingTask,
    setIsAddingTask,
    currentList,
    setCurrentList,
    handleStartAddingTask,
    handleCancelAddingTask,
    handleInputChange,
  } = useTaskAdding();

  const inputRef = useRef(null);

  const todos = useTodos();

  const dispatch = useDispatch();

  const handleRemoveAllTasks = () => dispatch(actions.removeCompletedTasks());

  const handleAddTask = useCallback(() => {
    const trimmedText = taskText.trim();

    if (trimmedText === "") {
      triggerErrorAnimation(inputRef.current, style.errorAnimation);
      return;
    }

    dispatch(
      actions.addTask(trimmedText[0].toUpperCase() + trimmedText.slice(1)),
    );

    setTaskText("");
    setIsAddingTask(false);
    setCurrentList(FILTER_TYPES.ALL);
  }, [taskText, dispatch, setIsAddingTask, setTaskText, setCurrentList]);

  const currentTodos = useMemo(() => todos[currentList], [currentList, todos]);

  return (
    <div className={style.taskViewContainer}>
      <TaskControls currentList={currentList} setCurrentList={setCurrentList} />
      <TasksToolbar
        todos={todos}
        currentList={currentList}
        handleRemoveAllTasks={handleRemoveAllTasks}
        handleStartAddingTask={handleStartAddingTask}
      />
      {isAddingTask && (
        <TaskAdder
          handleAddTask={handleAddTask}
          handleCancelAddingTask={handleCancelAddingTask}
          taskText={taskText}
          handleInputChange={handleInputChange}
          ref={inputRef}
        />
      )}
      {currentTodos.length > 0 ? (
        <TaskList currentList={currentList} currentTodos={currentTodos} />
      ) : (
        <EmptyTasks currentList={currentList} />
      )}
      <SortableSelect currentList={currentList} />
    </div>
  );
};
