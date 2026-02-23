import { useCallback, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import { TaskControls } from "../TasksControls";
import { TasksToolbar } from "../TasksToolbar";
import { TaskAdder } from "../TaskAdder";
import { TaskList } from "../TaskList";
import { EmptyTasks } from "../EmptyTasks";
import { SortableSelect } from "../SortableSelect";
import { Button } from "../../shared/Button";

import { FILTER_TYPES } from "../../constants";

import { useTodos } from "../../hooks/useTodos";
import { useDispatch } from "../../hooks/useDispatch";
import { useAuth } from "../../hooks/useAuth";

import { useTaskAdding } from "../../hooks/useTaskAdding";

import { triggerErrorAnimation } from "../../utils/triggerErrorAnimation";

import { todosService } from "../../services/todosService";
import { authService } from "../../services/authService";

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

  const todos = useTodos();

  const { todosAll } = todos;

  const dispatch = useDispatch();

  const { dispatch: authDispatch } = useAuth();

  const navigate = useNavigate();

  const handleRemoveAllTasks = async () => {
    try {
      await todosService.removeTaskCompleted(dispatch, todosAll);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddTask = useCallback(async () => {
    try {
      const trimmedText = taskText.trim();

      if (trimmedText === "") {
        triggerErrorAnimation(inputRef.current, style.errorAnimation);
        return;
      }
      const formattedText = trimmedText[0].toUpperCase() + trimmedText.slice(1);

      await todosService.addTask(dispatch, formattedText);

      setTaskText("");
      setIsAddingTask(false);
      setCurrentList(FILTER_TYPES.ALL);
    } catch (error) {
      console.error(error);
    }
  }, [taskText, dispatch, setIsAddingTask, setTaskText, setCurrentList]);

  useEffect(() => {
    todosService.getTasks(dispatch);
  }, [dispatch]);

  const handleLogout = () => {
    authService.logout(authDispatch);
    navigate("/login");
  };

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
      <Button onClick={handleLogout} className={style.buttonLogout}>
        <img className={style.logoutImage} src={logoutImage} alt="Logout"></img>
        Logout
      </Button>
    </div>
  );
};
