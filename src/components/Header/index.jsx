import { memo } from "react";
import style from "./index.module.css";

export const Header = memo(() => {
  return (
    <div className={style.headerMainContainer}>
      <h1>Todo App</h1>
    </div>
  );
});
