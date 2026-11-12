import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "./HeroSlider.module.css";
import { usePopularMovies } from "../../hooks/usePopularMovies";
import { getPosterUrl } from "../../api/movie";
import "swiper/css";
import "swiper/css/navigation";

const HeroSlider = () => {
  const { movies, loading, error } = usePopularMovies();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={24}
        navigation
        className={styles.swiper}
      >
        {movies.map((movie) => {
          const poster = getPosterUrl(movie.poster_path);
          return (
            <SwiperSlide key={movie.id} className={styles.slide}>
              <div className={styles.card}>
                {poster && (
                  <img className={styles.poster} src={poster} alt={movie.title} />
                )}
                <p className={styles.title}>{movie.title}</p>
                <span className={styles.badge}>
                  {movie.release_date.slice(0, 4)}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSlider;