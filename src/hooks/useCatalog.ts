import { useEffect, useState } from "react";
import { fetchCatalogRow, fetchGenres, type CatalogCard } from "../api/movie";

export interface CatalogRowData {
  title: string;
  items: CatalogCard[];
}

const CATALOG_ROWS = [
  { title: "Комедии", movieGenre: 35, tvGenre: 35 },
  { title: "Драмы", movieGenre: 18, tvGenre: 18 },
  { title: "Фэнтези", movieGenre: 14, tvGenre: 10765 },
  { title: "Триллеры", movieGenre: 53, tvGenre: 80 },
  { title: "Детективы", movieGenre: 9648, tvGenre: 9648 },
];

export interface CatalogRowData {
  title: string;
  items: CatalogCard[];
}

export function useCatalog() {
  const [rows, setRows] = useState<CatalogRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      const names = await fetchGenres(controller.signal);

      const data = await Promise.all(
        CATALOG_ROWS.map(async (row) => {
          const items = await fetchCatalogRow(row.movieGenre, row.tvGenre, controller.signal);
          return {
            title: row.title,
            items: items.map((item) => ({
              ...item,
              genreNames: item.genre_ids
                .slice(0, 2)
                .map((id) => names[id])
                .filter(Boolean)
                .join(", "),
            })),
          };
        }),
      );

      setRows(data);
    };

    load()
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { rows, loading, error };
}
