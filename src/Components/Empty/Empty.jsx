import css from "./Empty.module.css";
import { GoInbox } from "react-icons/go";

export const Empty = () => {
  return (
    <div className={css.wrapper}>
      <GoInbox size="50" />
      <p>No data yet</p>
    </div>
  );
};
