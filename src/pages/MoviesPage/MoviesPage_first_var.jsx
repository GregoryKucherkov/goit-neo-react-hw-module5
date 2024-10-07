import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchMovie from "../../api/videoApi";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMsg/ErrorMsg";

function MoviesPage() {
  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();

  const queryFromUrl = params.get("query") ?? ""; // Get search query from the URL

  // Fetch movies when the page loads or when the query in the URL changes
  useEffect(() => {
    if (queryFromUrl) {
      handleSearch(queryFromUrl);
    } else {
      setSearch([]);
    }
  }, [queryFromUrl]);

  const handleSearch = (searchQuery) => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setParams({ query: searchQuery }); // Update the URL
        const data = await fetchMovie(`search/movie`, {
          query: searchQuery,
          include_adult: false,
          page: 1,
        });
        setSearch(data.results);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {search.length > 0 && <MoviesList movies={search} />}
    </div>
  );
}

export default MoviesPage;
