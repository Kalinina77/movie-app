import React from 'react'
import styles from './Header.module.css';
import  iconSearch  from '../images/icons_search.png';
import  iconLk  from '../images/icon_lk.png';
import  iconNotification  from '../images/icon_notifications.png'
import { useState } from 'react';

const Header = () => {

    const [query, setQuery] = useState("");

  return (
    <div className={styles.header}>
        <div className={styles.header__container}>
            <nav className={styles.header__navigation}>
                <h1 className={styles.header__title}>кино<span>дом</span></h1>
                <div className={styles.header__navigation_link}>
                    <a className={styles.header__link}>Фильмы</a>
                    <a className={styles.header__link}>Сериалы</a>
                    <a className={styles.header__link}>Подборки</a>
                </div>
            </nav>
            <nav className={styles.header__navigation_link}>
                <label className={styles.header__search}>
                    <img src={iconSearch} alt="" aria-hidden="true" className={styles.header__searchIcon} />
                    <input
                    type="search"
                    name="search"
                    placeholder="Поиск"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.header__searchInput}
                    />
                </label>
                <a className={styles.header__link_icon}>
                    <img src={iconNotification} alt="Notification" />
                </a>
                <a className={styles.header__link_icon}>
                    <img src={iconLk} alt="lk" />
                </a>
            </nav>
        </div>
    </div>
  )
}

export default Header