import { useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { TaskControls } from "../TasksControls";
import { TasksToolbar } from "../TasksToolbar";
import { TaskAdder } from "../TaskAdder";
import { TaskList } from "../TaskList";
import { EmptyTasks } from "../EmptyTasks";
import { SortableSelect } from "../SortableSelect";
import { Button } from "../../shared/Button";

import { FILTER_TYPES } from "../../constants";

import {
  addTask,
  getTasks,
  removeTaskCompleted,
} from "../../redux/thunks/todosThunk";
import { logout } from "../../redux/thunks/authThunk";

import { useTaskAdding } from "../../hooks/useTaskCreate";

import { triggerErrorAnimation } from "../../utils/triggerErrorAnimation";

import logoutImage from "../../assets/logout.svg";

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

  const todosAll = useSelector((state) => state.todos.todosAll);

  const currentTodos = useSelector((state) => state.todos[currentList]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRemoveAllTasks = () => dispatch(removeTaskCompleted(todosAll));

  const handleAddTask = useCallback(() => {
    const trimmedText = taskText.trim();

    if (trimmedText === "") {
      triggerErrorAnimation(inputRef.current, style.errorAnimation);
      return;
    }
    const formattedText = trimmedText[0].toUpperCase() + trimmedText.slice(1);

    dispatch(addTask(formattedText));

    setTaskText("");
    setIsAddingTask(false);
    setCurrentList(FILTER_TYPES.ALL);
  }, [taskText, dispatch, setIsAddingTask, setTaskText, setCurrentList]);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={style.taskViewContainer}>
      <TaskControls currentList={currentList} setCurrentList={setCurrentList} />
      <TasksToolbar
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
      <Button onClick={handleLogout} className={style.buttonLogout}>
        <img className={style.logoutImage} src={logoutImage} alt="Logout"></img>
        Logout
      </Button>
    </div>
  );
};
