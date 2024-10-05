import { useEffect, useState } from "react";

import fetchMovie from "../../api/videoApi";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMsg/ErrorMsg";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovie();

        setMovies(data.results);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);
  return (
    <div>
      <h1>Trending today!</h1>
      {isLoading && <Loader />}

      {movies && <MoviesList movies={movies} />}
      {error && <ErrorMessage />}
    </div>
  );
}

export default HomePage;
