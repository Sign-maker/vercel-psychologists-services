import { ICON_CLASSES } from "../../constants/iconConstants";
import { BtnLoader } from "../BtnLoader/BtnLoader";
import { Icon } from "../Icon/Icon";
import css from "./FavoriteButton.module.css";

export const FavoriteButton = ({ isFavorite, onClick, isLoading }) => {
  return (
    <button className={css.favoriteBtn} type="button" onClick={onClick}>
      {isLoading ? (
        <BtnLoader />
      ) : isFavorite ? (
        <Icon
          iconName="icon-heart-hover"
          width="26"
          height="26"
          className={ICON_CLASSES.classAccent}
        />
      ) : (
        <Icon iconName="icon-heart-normal" width="26" height="26" />
      )}
    </button>
  );
};
