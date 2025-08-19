
import React, { useState, useEffect, useRef } from 'react';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  audioSrc: string;
  pageName: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, pageName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInitialPopup, setShowInitialPopup] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Check if user has previously interacted with audio
    const hasInteracted = localStorage.getItem('audioInteracted');
    if (hasInteracted) {
      setShowInitialPopup(false);
      setHasUserInteracted(true);
    }
  }, []);

  useEffect(() => {
    // When audio source changes (page change), stop current audio and load new one
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      setIsPlaying(false);
      
      // Auto-play if user has previously interacted
      if (hasUserInteracted && !showInitialPopup) {
        setTimeout(() => {
          handlePlay();
        }, 500);
      }
    }
  }, [audioSrc]);

  const handlePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  const handleInitialPlay = async () => {
    setHasUserInteracted(true);
    localStorage.setItem('audioInteracted', 'true');
    setShowInitialPopup(false);
    
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio play failed:', error);
      }
    }
  };

  const handleAudioEnd = () => {
    // Loop the audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        onEnded={handleAudioEnd}
        preload="auto"
      >
        <source src={audioSrc} type="audio/mpeg" />
        <source src={audioSrc.replace('.mp3', '.ogg')} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Initial Popup */}
      {showInitialPopup && (
        <div className={styles.initialPopup}>
          <div className={styles.popupContent}>
            <div className={styles.musicIcon}>🎵</div>
            <h3>Enjoy the {pageName} Experience</h3>
            <p>Click to play background music</p>
            <button 
              className={styles.initialPlayButton}
              onClick={handleInitialPlay}
            >
              <span className={styles.playIcon}>▶️</span>
              Play Music
            </button>
          </div>
        </div>
      )}

      {/* Fixed Audio Control Button */}
      {!showInitialPopup && (
        <button
          className={`${styles.audioControl} ${hasUserInteracted ? styles.positioned : ''}`}
          onClick={handlePlay}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          <span className={styles.controlIcon}>
            {isPlaying ? '⏸️' : '▶️'}
          </span>
        </button>
      )}
    </>
  );
};

export default AudioPlayer;
