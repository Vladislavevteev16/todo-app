import { FILTER_TYPES } from "../../constants";

import style from "./index.module.css";

export const EmptyTasks = ({ currentList }) => {
  return (
    <div className={style.emptyTaskContainer}>
      <h3 className={style.title}>
        {currentList === FILTER_TYPES.ALL
          ? "Задач пока нет"
          : "Нет выполненных задач"}
      </h3>
      <p className={style.description}>
        {currentList === FILTER_TYPES.ALL ? "Создайте первую задачу" : ""}
      </p>
    </div>
  );
};
