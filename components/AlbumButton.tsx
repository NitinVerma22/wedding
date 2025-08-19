
import React, { useState } from 'react';
import AlbumViewer from './AlbumViewer';
import styles from './AlbumButton.module.css';

const AlbumButton: React.FC = () => {
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  const toggleAlbum = () => {
    setIsAlbumOpen(!isAlbumOpen);
  };

  return (
    <>
      <button className={styles.albumButton} onClick={toggleAlbum}>
        <div className={styles.albumIcon}>
          📖
        </div>
        <span className={styles.albumText}>Album</span>
      </button>

      <AlbumViewer isOpen={isAlbumOpen} onClose={() => setIsAlbumOpen(false)} />
    </>
  );
};

export default AlbumButton;
