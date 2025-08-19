
import React from 'react';
import Header from '../components/Header';
import styles from '../styles/EventPage.module.css';

const Reception = () => {
  const images = [
    '/images/reception1.jpg',
    '/images/reception2.jpg',
    '/images/reception3.jpg',
    '/images/reception4.jpg',
    '/images/reception5.jpg',
    '/images/reception6.jpg'
  ];

  return (
    <div>
      <Header name="Male & Female" nav={["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"]} />
      
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src="/images/reception-hero.jpg" alt="Reception Party" />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Reception Celebration</h1>
          <p className={styles.heroSubtitle}>Grand celebration with family and friends honoring our love</p>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>Celebration Highlights</h2>
          <div className={styles.imageGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img src={image} alt={`Reception moment ${index + 1}`} />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageIcon}>🎉</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reception;
