import { Outlet } from "react-router";

import { Header } from "../Header";

import style from "./index.module.css";

export const Layout = () => {
  return (
    <div className={style.mainContainer}>
      <Header />
      <Outlet />
    </div>
  );
};
