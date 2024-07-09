import { ICON_CLASSES } from "../../constants/iconConstants";
import { Icon } from "../Icon/Icon";
import css from "./ReviewItem.module.css";

export const ReviewItem = ({ review: { comment, rating, reviewer } }) => {
  return (
    <li className={css.item}>
      <div className={css.nameWrapper}>
        <div className={css.firstLetter}>{reviewer[0].toUpperCase()}</div>
        <div>
          <h3 className={css.reviewerName}>{reviewer}</h3>
          <p className={css.rating}>
            <Icon
              className={ICON_CLASSES.classStar}
              iconName="icon-star"
              width={16}
            />
            <span>{rating}</span>
          </p>
        </div>
      </div>
      <p className={css.comment}>{comment}</p>
    </li>
  );
};
