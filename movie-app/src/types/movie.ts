export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    overview: string;
    genre_ids: number[];
}

// подсказка для поиска https://developer.themoviedb.org/reference/movie-popular-list