import React, { useEffect, useState } from 'react';
import styles from './AudioPlayer.module.css';
import { useAudio } from '../contexts/AudioContext';
import AudioSidebar from './AudioSidebar';

interface AudioPlayerProps {
  pageName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ pageName }) => {
  const { isPlaying, togglePlay, setCurrentPage } = useAudio();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Update the current page in the audio context when component mounts
    setCurrentPage(pageName);
  }, [pageName, setCurrentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPlaying) {
        setShowSidebar(true);
      }
    }, 4000); // Show sidebar after 4 seconds if audio is not playing

    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <>
      <button
        className={`${styles.audioControl} ${styles.positioned}`}
        onClick={togglePlay}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        <span className={styles.controlIcon}>
          {isPlaying ? '⏸️' : '▶️'}
        </span>
      </button>

      {/* Sidebar for user interaction */}
      {showSidebar && (
        <AudioSidebar onClose={() => setShowSidebar(false)} />
      )}
    </>
  );
};

export default AudioPlayer;
