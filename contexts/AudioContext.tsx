import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { getAudioSource } from '../utils/audioUtils';

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('Wedding');
  const [currentAudioSrc, setCurrentAudioSrc] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Set up audio event listeners
    const handleCanPlay = () => {
      // Auto-play when audio is ready
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Auto-play failed (browser restrictions):', error);
        });
      }
    };

    const handleEnded = () => {
      // Loop the audio
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    // Initial setup
    const initializeAudio = async () => {
      const source = await getAudioSource(currentPage);
      if (audioRef.current) {
        audioRef.current.src = source;
        setCurrentAudioSrc(source);
        
        // Auto-play immediately
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.log('Initial auto-play failed:', error);
            setIsPlaying(false);
          });
      }
    };

    initializeAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    const updateAudioSource = async () => {
      if (!audioRef.current) return;

      const source = await getAudioSource(currentPage);
      
      // Only change source if it's different
      if (source !== currentAudioSrc) {
        const wasPlaying = isPlaying;
        
        // Pause current audio
        audioRef.current.pause();
        
        // Set new source
        audioRef.current.src = source;
        setCurrentAudioSrc(source);
        
        // Load and play if it was playing
        audioRef.current.load();
        if (wasPlaying) {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
          } catch (error) {
            console.log('Audio play failed after source change:', error);
            setIsPlaying(false);
          }
        }
      }
    };

    updateAudioSource();
  }, [currentPage, currentAudioSrc, isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Set user interaction flag
        localStorage.setItem('audioInteracted', 'true');
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio toggle failed:', error);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlay,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
