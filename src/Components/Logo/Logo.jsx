import { Link } from "react-router-dom";
import css from "./Logo.module.css";

export const Logo = () => {
  return (
    <Link className={css.logoContainer} to="/">
      <span className={css.logoFirstPart}>psychologists</span>
      <span className={css.logoSecondPart}>.</span>
      <span className={css.logoThirdPart}>services</span>
    </Link>
  );
};
