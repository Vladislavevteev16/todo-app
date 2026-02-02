import { useCallback, useState } from "react";

export const useTaskAdding = (initialState = "") => {
  const [taskText, setTaskText] = useState(initialState);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [currentList, setCurrentList] = useState("todosAll");

  const handleStartAddingTask = useCallback(() => setIsAddingTask(true), []);
  const handleCancelAddingTask = useCallback(() => {
    setIsAddingTask(false);
    setTaskText("");
  }, []);

  const handleInputChange = useCallback(({ target: { value } }) => {
    setTaskText(value);
  }, []);

  return {
    taskText,
    setTaskText,
    isAddingTask,
    setIsAddingTask,
    currentList,
    setCurrentList,
    handleStartAddingTask,
    handleCancelAddingTask,
    handleInputChange,
  };
};
