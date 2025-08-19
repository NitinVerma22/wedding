
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import AlbumButton from '../components/AlbumButton';
import styles from '../styles/EventPage.module.css';

const Reception = () => {
  const [images, setImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState('/images/reception-hero.jpg');

  useEffect(() => {
    fetch('/api/gallery/reception')
      .then(res => res.json())
      .then(data => {
        setImages(data.images);
        setHeroImage(data.heroImage);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div>
      <Header name="Male & Female" nav={["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"]} />
      
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <img src={heroImage} alt="Reception Party" />
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
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className={styles.imageCard}>
                  <img src={image} alt={`Reception moment ${index + 1}`} />
                  <div className={styles.imageOverlay}>
                    <span className={styles.imageIcon}>🎉</span>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noImages}>
                <p>No images available yet. Please add images to the gallery.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
      <AudioPlayer audioSrc="/audio/reception-music.mp3" pageName="Reception" />
      <AlbumButton />
    </div>
  );
};

export default Reception;
