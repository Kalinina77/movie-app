import { useCatalog } from "../../hooks/useCatalog";
import CatalogRow from "../CatalogRow/CatalogRow";
import Button from "../Button";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const { rows, loading, error } = useCatalog();

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.catalog}>
      <h1 className={styles.heading}>Каталог фильмов и сериалов</h1>

      {rows.map((row) => (
        <CatalogRow key={row.title} title={row.title} items={row.items} />
      ))}

      <Button className={styles.button}>Посмотреть всё</Button>
    </section>
  );
};

export default Catalog;
