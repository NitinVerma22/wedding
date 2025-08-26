
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useAlbum } from '../contexts/AlbumContext';
import FlowerRain from "./FlowerRain";

interface HeaderProps {
  name: string;
  nav: string[];
}

const Header: React.FC<HeaderProps> = ({ name, nav }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAlbumOpen } = useAlbum();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isAlbumOpen) {
    return null;
  }

  return (
    <header className={styles.header}>
      <FlowerRain/>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <div className={styles.logoDecoration}>
                <span className={styles.flowerLeft}>🌸</span>
                <h1 className={styles.title}>
                  <span className={styles.titleMain}>{name}</span>
                  <span className={styles.titleSubtext}>Forever Together</span>
                </h1>
                <span className={styles.flowerRight}>🌺</span>
              </div>
              <div className={styles.heartDecoration}>
                <span className={styles.heartIcon}>💕</span>
              </div>
            </div>
          </Link>
        </div>
        
        <button 
          className={`${styles.mobileMenuToggle} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
          <span className={styles.hamburger}></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={`${styles.navLink} ${styles.homeLink}`} onClick={() => setIsMenuOpen(false)}>
                <span className={styles.navIcon}>🏠</span>
                <span className={styles.navText}>Home</span>
              </Link>
            </li>
            {nav.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <Link href={`/${item.toLowerCase()}`} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  <span className={styles.navIcon}>
                    {item === 'Haldi' && '💛'}
                    {item === 'Mehndi' && '🌿'}
                    {item === 'Sangeet' && '🎵'}
                    {item === 'Wedding' && '💒'}
                    {item === 'Reception' && '🎉'}
                  </span>
                  <span className={styles.navText}>{item}</span>
                </Link>
              </li>
            ))}
          </ul>
          <FlowerRain trigger={Date.now()} id="header-flowers" />
        </nav>
      </div>
      
      <div className={styles.headerDecorations}>
        <div className={styles.floatingFlower1}>🌸</div>
        <div className={styles.floatingFlower2}>🌺</div>
        <div className={styles.floatingFlower3}>🌹</div>
      </div>
    </header>
  );
};

export default Header;
