import React from 'react';
import styles from './BookButton.module.css';

interface BookButtonProps {
  onClick?: () => void;
}

const BookButton: React.FC<BookButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles.bookButton}
      onClick={onClick}
      title="View Album"
    >
      <span className={styles.bookIcon}>📖</span>
    </button>
  );
};

export default BookButton;
