
import React from 'react';
import Header from '../components/Header';
import styles from '../styles/EventPage.module.css';

const Haldi = () => {
  const images = [
    '/images/haldi1.jpg',
    '/images/haldi2.jpg',
    '/images/haldi3.jpg',
    '/images/haldi4.jpg',
    '/images/haldi5.jpg',
    '/images/haldi6.jpg'
  ];

  return (
    <div>
      <Header name="Male & Female" nav={["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"]} />
      
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src="/images/haldi-hero.jpg" alt="Haldi Ceremony" />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Haldi Ceremony</h1>
          <p className={styles.heroSubtitle}>A traditional blessing with turmeric paste for good luck and prosperity</p>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.container}>
          <h2 className={styles.galleryTitle}>Memories from our Haldi</h2>
          <div className={styles.imageGrid}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageCard}>
                <img src={image} alt={`Haldi moment ${index + 1}`} />
                <div className={styles.imageOverlay}>
                  <span className={styles.imageIcon}>💛</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Haldi;
