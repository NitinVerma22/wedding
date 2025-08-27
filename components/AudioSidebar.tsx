import React from 'react';
import styles from './AudioSidebar.module.css';
import { useAudio } from '../contexts/AudioContext';

const AudioSidebar: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { togglePlay } = useAudio();

  const handleClick = () => {
    togglePlay();
    onClose();
  };

  return (
    <div className={styles.sidebar}>
      <p>Click me to play</p>
      <button onClick={handleClick}>Play Audio</button>
    </div>
  );
};

export default AudioSidebar;
