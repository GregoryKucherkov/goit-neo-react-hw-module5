import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchMovie from "../../api/videoApi";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMsg/ErrorMsg";

function MoviesPage() {
  const [search, setSearch] = useState([]); //array of searched movies-> to make/draw a list
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams(); //to read and update url

  const queryFromUrl = params.get("query") ?? "";
  // Fetch movies when the page loads or when the query in the URL changes
  // Get search query from the URL

  useEffect(() => {
    if (queryFromUrl) {
      handleSearch(queryFromUrl);
    } else {
      // setSearchQuery("");
      setSearch([]);
    }
  }, [queryFromUrl]);

  useEffect(() => {
    if (!searchQuery) {
      setSearch([]);
      return;
    }
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchMovie(`search/movie`, {
          query: searchQuery,
          include_adult: false,
          page: 1,
        });

        setParams({ query: searchQuery }); // Update the URL
        setSearch(data.results);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [searchQuery, setParams]);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setSearch([]);
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
