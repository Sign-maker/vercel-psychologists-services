import icons from "../../assets/images/icons.svg";
import css from "./Icon.module.css";
import { ICON_CLASSES } from "../../constants/iconConstants";

export const Icon = ({
  iconName,
  width = "20",
  height = "20",
  className = ICON_CLASSES.classDark,
}) => {
  return (
    <svg width={width} height={height} className={css[className]}>
      <use xlinkHref={`${icons}#${iconName}`} />
    </svg>
  );
};
