import { useState, useEffect, useRef, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import fetchMovie from "../../api/videoApi";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";

import { IoMdArrowBack } from "react-icons/io";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/movies");
  // const backLinkHref = location.state ?? "/movies";

  useEffect(() => {
    const singleMovie = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovie(`movie/${moviesId}`);

        setMovie(data);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    singleMovie();
  }, [moviesId]);
  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMsg />}
      {movie && (
        <div>
          <Link to={backLinkHref.current}>
            {" "}
            <p className={css.backLink}>
              <IoMdArrowBack />
              <span>Go back</span>
            </p>
            <div></div>
          </Link>
          <div className={css.detailsDiv}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              ></img>
            )}
            <div className={css.creditsDiv}>
              <h2>{movie.title}</h2>
              <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
              <p></p>
              <b>Overview</b>
              <p>{movie.overview}</p>
              <b>Genres</b>
              <p>{movie.genres?.map((genre) => genre.name).join(", ") ?? ""}</p>
            </div>
          </div>
          <hr />
          Additional information
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <hr />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default MovieDetailsPage;
