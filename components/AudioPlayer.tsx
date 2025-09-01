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
  const [sidebarDismissed, setSidebarDismissed] = useState(false);

  useEffect(() => {
    // Update the current page in the audio context when component mounts
    setCurrentPage(pageName);
  }, [pageName, setCurrentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPlaying && !sidebarDismissed) {
        setShowSidebar(true);
      }
    }, 4000); // Show sidebar after 4 seconds if audio is not playing and not dismissed

    return () => clearTimeout(timer);
  }, [isPlaying, sidebarDismissed]);

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
      {showSidebar && !sidebarDismissed && (
        <AudioSidebar
          onClose={() => setShowSidebar(false)}
          onDismiss={() => {
            setShowSidebar(false);
            setSidebarDismissed(true);
          }}
        />
      )}
    </>
  );
};

export default AudioPlayer;
