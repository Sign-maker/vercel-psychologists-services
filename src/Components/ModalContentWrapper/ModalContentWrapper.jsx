import { ACTION_OPTIONS } from "../../constants/actionOptionsConstants";
import { ICON_CLASSES } from "../../constants/iconConstants";
import { Icon } from "../Icon/Icon";
import css from "./ModalContentWrapper.module.css";

export const ModalContentWrapper = ({ actionOption, onClose, children }) => {
  const { title, text, type } = actionOption;
  return (
    <div
      className={
        type === ACTION_OPTIONS.makeAppointment.type
          ? `${css.wrapper} ${css.wrapperMakeAppoinment}`
          : css.wrapper
      }
    >
      <div className={css.titleAndTextWrapper}>
        {title && <h2 className={css.title}>{title}</h2>}
        {text && <p className={css.text}>{text}</p>}
      </div>

      {children}
      <button type="button" onClick={onClose} className={css.closeBtn}>
        <Icon
          iconName="icon-x"
          height="32"
          width="32"
          className={ICON_CLASSES.classDark}
        />
      </button>
    </div>
  );
};
