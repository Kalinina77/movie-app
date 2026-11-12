import type { Movie } from "../types/movie";

export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface PopularResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export async function fetchPopularMovies(page = 1, signal?: AbortSignal): Promise<Movie[]> {
  const params = new URLSearchParams({
    api_key: API_KEY ?? "",
    language: "ru-RU",
    page: String(page),
  });

  const response = await fetch(`${BASE_URL}/movie/popular?${params}`, { signal });
  if (!response.ok) {
    throw new Error("Не удалось загрузить фильмы");
  }

  const data: PopularResponse = await response.json();
  return data.results;
}

export const getPosterUrl = (path: string | null) =>
  path ? `${IMAGE_BASE_URL}${path}` : null;