
import React from 'react';
import Header from '../components/Header';
import styles from '../styles/EventPage.module.css';

const Wedding = () => {
  const images = [
    '/images/wedding1.jpg',
    '/images/wedding2.jpg',
    '/images/wedding3.jpg',
    '/images/wedding4.jpg',
    '/images/wedding5.jpg',
    '/images/wedding6.jpg'
  ];

  return (
    <div>
      <Header name="Male & Female" nav={["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"]} />
      
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src="/images/wedding-hero.jpg" alt="Wedding Ceremony" />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Wedding Ceremony</h1>
          <p className={styles.heroSubtitle}>The sacred moment where two souls unite as one forever</p>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>Sacred Moments</h2>
          <div className={styles.imageGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img src={image} alt={`Wedding moment ${index + 1}`} />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageIcon}>💕</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wedding;
