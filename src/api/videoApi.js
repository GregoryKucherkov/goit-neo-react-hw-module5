import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGRhNjg0YzJiOTc5YWI4MzJmYjRiYjBlMjI0YzViMyIsIm5iZiI6MTcyNzg4NjAxOC44Mzc4NDIsInN1YiI6IjY2ZmQ0ZDFmNjdiMmExNjQ2NmQwNzVmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xi2Vak8YSw-x0-_KLuzOQ11xa8kWYt0irFI5wkGEUO0";

const fetchMovie = async (option = "trending/movie/day", params = {}) => {
  const requestParams = {
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
    params: {
      language: "en-US",
      ...params,
    },
  };

  const response = await axios(option, requestParams);
  return response.data;
};

export default fetchMovie;
