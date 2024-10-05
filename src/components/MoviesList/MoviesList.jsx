import { Link, useLocation } from "react-router-dom";

function MoviesList({ movies }) {
  const location = useLocation();
  return (
    <>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MoviesList;
