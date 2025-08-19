
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Haldi', 'Mehndi', 'Sangeet', 'Wedding', 'Reception'];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <h1 className={styles.title}>
              <span className={styles.heartIcon}>💕</span>
              Male & Female
              <span className={styles.heartIcon}>💕</span>
            </h1>
          </Link>
        </div>
        
        <button 
          className={styles.mobileMenuToggle}
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
              <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                🏠 Home
              </Link>
            </li>
            {navItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <Link href={`/${item.toLowerCase()}`} className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
