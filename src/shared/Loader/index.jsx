import loader from "../../assets/loader.png";
import style from "./index.module.css";

export const Loader = ({ size }) => {
  return (
    <div className={style.loaderContainer}>
      <img
        style={size}
        src={loader}
        alt="Loading..."
        className={style.loader}
      />
    </div>
  );
};
