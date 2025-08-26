
import React from 'react';
import Link from 'next/link';
import { useAlbum } from '../contexts/AlbumContext';
import styles from './EventCard.module.css';

interface EventCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, image, description, link }) => {
  const { openAlbum } = useAlbum();

  const handleViewAlbum = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only open album for the "Album" card
    if (title === 'Album') {
      openAlbum('all');
    }
  };

  return (
    <Link href={link} className={styles.card}>
      <div className={styles.cardImage}>
        <img src={image} alt={title} />
        <div className={styles.cardOverlay}>
          <div className={styles.cardIcon}>💖</div>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <span 
          className={styles.cardButton} 
          onClick={title === 'Album' ? handleViewAlbum : undefined}
          style={{ 
            cursor: title === 'Album' ? 'pointer' : 'default',
            zIndex: title === 'Album' ? 10 : 1,
            position: 'relative'
          }}
        >
          View Album
        </span>
      </div>
    </Link>
  );
};

export default EventCard;
