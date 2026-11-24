import React from 'react'
import styles from './Hero.module.css';
import Button from "../Button";
import HeroSlider from '../HeroSlider';


const Hero = () => {
  return (
    <div className={styles.container}>
        <div>
            <p className={styles.title}>Самые сочные премьеры кино — у вас дома</p>
            <p className={styles.subtitle}>
                Ежедневно пополняемая библиотека
                с лучшими фильмами и сериалами — в дубляже
                и оригинале.Целый месяц бесплатно!
            </p>
            <Button className={styles.fullWidth}>Смотреть бесплатно</Button>
        </div>
        <HeroSlider/>
        
    </div>
  )
}

export default Hero