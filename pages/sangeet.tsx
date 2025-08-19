
import React from 'react';
import Header from '../components/Header';
import styles from '../styles/EventPage.module.css';

const Sangeet = () => {
  const images = [
    '/images/sangeet1.jpg',
    '/images/sangeet2.jpg',
    '/images/sangeet3.jpg',
    '/images/sangeet4.jpg',
    '/images/sangeet5.jpg',
    '/images/sangeet6.jpg'
  ];

  return (
    <div>
      <Header name="Male & Female" nav={["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"]} />
      
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src="/images/sangeet-hero.jpg" alt="Sangeet Night" />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Sangeet Night</h1>
          <p className={styles.heroSubtitle}>Musical performances, dance, and endless entertainment</p>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>Dance & Music</h2>
          <div className={styles.imageGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img src={image} alt={`Sangeet moment ${index + 1}`} />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageIcon}>🎵</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sangeet;
