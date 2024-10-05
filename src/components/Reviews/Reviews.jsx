import { useEffect, useState } from "react";
import fetchMovie from "../../api/videoApi";
import { useParams } from "react-router-dom";
import css from "./Reviews.module.css";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import Loader from "../Loader/Loader";

function Reviews() {
  const { moviesId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const castReviews = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovie(`movie/${moviesId}/reviews`);
        setReviews(data.results);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    castReviews();
  }, [moviesId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMsg />}
      {!isLoading &&
        reviews?.length === 0 && ( // Check for no reviews
          <p>No reviews for this movie available.</p>
        )}
      {reviews?.length > 0 && (
        <ul className={css.revUl}>
          {reviews.map((review) => (
            <li key={review.id} className={css.revLi}>
              <p>
                <b>Author: </b>
                {review.author}
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reviews;
