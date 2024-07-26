const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTAxZmFjYjYwZDNmMGI0MTJiZWFjMDM0ZDFlNjE5MiIsIm5iZiI6MTcyMTg4MDEyNS4yNzkzNzMsInN1YiI6IjY2YTBjOTZhZmQ1ZDVjOWJmZWRkNzlmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4p4lJ5x5lJZDSQT-ZwevVLEgW_HtdsSjOVsUhGqyapE";

const BASE_URL = "https://api.themoviedb.org/3";

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse extends BaseResponse {
  results: Movie[];
}

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  upcoming: () =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json()),
};
