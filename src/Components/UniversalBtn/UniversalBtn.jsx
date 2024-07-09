import { UNIVESAL_BUTTON_CLASSES } from "../../constants/universalButtonConstants";
import { BtnLoader } from "../BtnLoader/BtnLoader";
import css from "./UniversalBtn.module.css";

export const UniversalBtn = ({
  onClick,
  width = "100%",
  height = 48,
  isLoading = false,
  disabled,
  type = "button",
  btnClass = UNIVESAL_BUTTON_CLASSES.btnFilled,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${css.btn} ${css[btnClass]}`}
      style={{ width, height }}
      disabled={isLoading || disabled}
    >
      {isLoading && (
        <span>
          <BtnLoader
            color={
              btnClass === UNIVESAL_BUTTON_CLASSES.btnTransparent
                ? "#191a15"
                : "#fbfbfb"
            }
          />
        </span>
      )}
      {children}
    </button>
  );
};
