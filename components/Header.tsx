
import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const navItems = ['Haldi', 'Mehndi', 'Sangeet', 'Wedding', 'Reception'];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 className={styles.title}>
            <span className={styles.heartIcon}>💕</span>
            Male & Female
            <span className={styles.heartIcon}>💕</span>
          </h1>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <Link href={`/${item.toLowerCase()}`} className={styles.navLink}>
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
