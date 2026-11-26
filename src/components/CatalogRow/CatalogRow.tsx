import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./CatalogRow.module.css";
import MovieCard from "../MovieCard/MovieCard";
import type { CatalogCard } from "../../api/movie";

interface CatalogRowProps {
  title: string;
  items: CatalogCard[];
}

const CatalogRow = ({ title, items }: CatalogRowProps) => (
  <section className={styles.row}>
    <a className={styles.title} href="#">
      {title}
    </a>
    <Swiper
      modules={[Navigation]}
      slidesPerView={4}
      spaceBetween={20}
      navigation
      className={styles.swiper}
    >
      {items.map((item) => (
        <SwiperSlide key={`${item.type}-${item.id}`}>
          <MovieCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default CatalogRow;
