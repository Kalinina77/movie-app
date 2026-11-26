import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY ?? "";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const getPosterUrl = (path: string | null) => (path ? `${IMAGE_BASE}/w500${path}` : null);

export const getBackdropUrl = (path: string | null) => (path ? `${IMAGE_BASE}/w780${path}` : null);

async function get<T>(
  path: string,
  params: Record<string, string> = {},
  signal?: AbortSignal,
): Promise<T> {
  const query = new URLSearchParams({ api_key: API_KEY, language: "ru-RU", ...params });
  const response = await fetch(`${BASE_URL}${path}?${query}`, { signal });
  if (!response.ok) throw new Error("Ошибка запроса к TMDB");
  return response.json();
}

export const fetchPopularMovies = async (page = 1, signal?: AbortSignal): Promise<Movie[]> => {
  const data = await get<{ results: Movie[] }>("/movie/popular", { page: String(page) }, signal);
  return data.results;
};

export interface CatalogItem {
  id: number;
  title: string;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  type: "movie" | "tv";
}

interface RawItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
}

const discover = async (
  kind: "movie" | "tv",
  genreId: number,
  signal?: AbortSignal,
): Promise<CatalogItem[]> => {
  const data = await get<{ results: RawItem[] }>(
    `/discover/${kind}`,
    { with_genres: String(genreId), sort_by: "popularity.desc" },
    signal,
  );
  return data.results.map((item) => ({
    id: item.id,
    title: item.title ?? item.name ?? "",
    backdrop_path: item.backdrop_path,
    vote_average: item.vote_average,
    popularity: item.popularity,
    genre_ids: item.genre_ids,
    type: kind,
  }));
};

export const fetchCatalogRow = async (
  movieGenre: number,
  tvGenre: number,
  signal?: AbortSignal,
  limit = 30,
): Promise<CatalogItem[]> => {
  const [movies, tv] = await Promise.all([
    discover("movie", movieGenre, signal),
    discover("tv", tvGenre, signal),
  ]);
  return [...movies, ...tv].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
};

export interface CatalogCard extends CatalogItem {
  genreNames: string;
}

export const fetchGenres = async (signal?: AbortSignal): Promise<Record<number, string>> => {
  const [movie, tv] = await Promise.all([
    get<{ genres: { id: number; name: string }[] }>("/genre/movie/list", {}, signal),
    get<{ genres: { id: number; name: string }[] }>("/genre/tv/list", {}, signal),
  ]);
  return Object.fromEntries([...movie.genres, ...tv.genres].map((g) => [g.id, g.name]));
};
