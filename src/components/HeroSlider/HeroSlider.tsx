import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative } from "swiper/modules";
import styles from "./HeroSlider.module.css";
import { usePopularMovies } from "../../hooks/usePopularMovies";
import { getPosterUrl } from "../../api/movie";
import "swiper/css";
import "swiper/css/navigation";
import { format, parseISO, isValid } from "date-fns";
import "swiper/css/effect-creative";

const getYear = (date: string) => {
  const parsed = parseISO(date);
  return isValid(parsed) ? format(parsed, "yyyy") : "";
};

const HeroSlider = () => {
  const { movies, loading, error } = usePopularMovies();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation, EffectCreative]}
        slidesPerView={3}
        navigation
        effect="creative"
        creativeEffect={{
          limitProgress: 2,
          prev: { translate: ["-100%", 0, 0], opacity: 0 },
          next: { translate: ["80%", 0, -1], scale: 0.9 },
        }}
        className={styles.swiper}
      >
        {movies.map((movie) => {
          const poster = getPosterUrl(movie.poster_path);
          return (
            <SwiperSlide key={movie.id} className={styles.slide}>
              <div className={styles.card}>
                {poster && <img className={styles.poster} src={poster} alt={movie.title} />}
                <p className={styles.title}>{movie.title}</p>
                <span className={styles.badge}>{getYear(movie.release_date)}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
