import React from 'react';
import styles from './AudioSidebar.module.css';
import { useAudio } from '../contexts/AudioContext';

const AudioSidebar: React.FC<{ onClose: () => void; onDismiss: () => void }> = ({ onClose, onDismiss }) => {
  const { togglePlay } = useAudio();

  const handleClick = () => {
    togglePlay();
    onClose();
  };

  return (
    <div className={styles.sidebar}>
      <button className={styles.closeButton} onClick={onDismiss}>×</button>
      <p>Click To</p>
      <button onClick={handleClick}>Play Audio</button>
    </div>
  );
};

export default AudioSidebar;
