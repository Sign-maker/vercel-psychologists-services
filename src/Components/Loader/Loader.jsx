import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => (
  <div className={css.loaderContainer}>
    <RotatingLines
      visible={true}
      height="60"
      width="60"
      color="grey"
      strokeColor="gray"
      strokeWidth="3"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </div>
);
