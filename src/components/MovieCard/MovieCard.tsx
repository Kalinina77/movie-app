import { getBackdropUrl, type CatalogCard } from "../../api/movie";
import styles from "./MovieCard.module.css";

const MovieCard = ({ item }: { item: CatalogCard }) => {
  const image = getBackdropUrl(item.backdrop_path);
  const typeLabel = item.type === "movie" ? "Фильм" : "Сериал";

  return (
    <a className={styles.card} href="#">
      {image && <img className={styles.image} src={image} alt={item.title} />}
      <div className={styles.meta}>
        <span className={styles.rating}>{item.vote_average.toFixed(1)}</span>
        {" • "}
        {typeLabel}
        {item.genreNames && ` • ${item.genreNames}`}
      </div>
      <p className={styles.title}>{item.title}</p>
    </a>
  );
};

export default MovieCard;
