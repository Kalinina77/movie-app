import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../api/movie";
import type { Movie } from "../types/movie";

export function usePopularMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // для отмены если компонент размонтировался, вопрос как лучше через AbortController либо через флаг?
    const controller = new AbortController();

    fetchPopularMovies(1, controller.signal)
      .then(setMovies)
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { movies, loading, error };
}