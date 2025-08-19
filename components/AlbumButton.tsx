
import React from 'react';
import styles from './AlbumButton.module.css';

const AlbumButton: React.FC = () => {
  const handleClick = () => {
    // You can replace this URL with your external album website
    window.open('https://your-external-album-website.com', '_blank');
  };

  return (
    <button className={styles.albumButton} onClick={handleClick}>
      <div className={styles.albumIcon}>
        📖
      </div>
      <span className={styles.albumText}>Album</span>
    </button>
  );
};

export default AlbumButton;
