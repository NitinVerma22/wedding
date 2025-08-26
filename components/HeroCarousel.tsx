import React, { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';
import FlowerRain from '../components/FlowerRain';
const HeroCarousel = ({ images, title, subtitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={styles.carousel}>
      {/* 🔹 Overlay Text */}
      <FlowerRain trigger={Date.now()} id="carousel-flowers" />
      <div className={styles.heroContent}>
        {title && <h1 className={styles.heroTitle}>{title}</h1>}
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
      </div>

      {/* Carousel Images */}
      <div className={styles.carouselImages}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.carouselItem} ${index === currentIndex ? styles.active : ''}`}
          >
            <img
              src={image}
              alt={`Hero Image ${index + 1}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className={styles.prevButton} onClick={goToPrevious}>❮</button>
      <button className={styles.nextButton} onClick={goToNext}>❯</button>

      {/* Indicators */}
      <div className={styles.indicators}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
