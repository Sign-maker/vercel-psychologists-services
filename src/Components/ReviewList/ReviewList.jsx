import { ReviewItem } from "../ReviewItem/ReviewItem";

export const ReviewList = ({ reviews }) => {
  return (
    <ul>
      {reviews.map((review, idx) => (
        <ReviewItem review={review} key={idx} />
      ))}
    </ul>
  );
};
