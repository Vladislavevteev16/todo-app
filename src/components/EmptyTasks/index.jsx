import style from "./index.module.css";

export const EmptyTasks = ({ currentList }) => {
  return (
    <div className={style.emptyTaskContainer}>
      <h3 className={style.title}>
        {currentList === "todosAll"
          ? "Задач пока нет"
          : "Нет выполненных задач"}
      </h3>
      <p className={style.description}>
        {currentList === "todosAll" ? "Создайте первую задачу" : ""}
      </p>
    </div>
  );
};

