import { useEffect, useState } from "react";
import fetchMovie from "../../api/videoApi";
import { useParams } from "react-router-dom";
import css from "./Cast.module.css";
import Loader from "../Loader/Loader";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

function Cast() {
  const { moviesId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const castMovie = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovie(`movie/${moviesId}/credits`);
        setCast(data.cast);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    castMovie();
  }, [moviesId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMsg />}
      {!isLoading && cast.length === 0 && (
        <p>No credits info for this movie available.</p>
      )}

      {cast?.length > 0 && (
        <ul className={css.listUl}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.listLi}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cast;
