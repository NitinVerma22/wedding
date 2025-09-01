"use client";
import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./Album.module.css";
import { useAlbum } from "../contexts/AlbumContext";

interface AlbumProps {
  onClose: () => void;
  folder?: string;
  autoFlipMs?: number;
}

const Album: React.FC<AlbumProps> = ({ onClose, folder = "images", autoFlipMs = 3000 }) => {
  const [images, setImages] = useState<string[]>([]);
  const [isAutoFlipEnabled, setIsAutoFlipEnabled] = useState(true);
  const [zoomedPage, setZoomedPage] = useState<number | null>(null);
  const bookRef = useRef<any>(null); // react-pageflip doesn't provide strong TS types
  const autoFlipIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { coupleNames } = useAlbum();

  // Fetch images
  useEffect(() => {
    let mounted = true;
    const fetchImages = async () => {
      const res = await fetch(`/api/images?folder=${encodeURIComponent(folder)}`);
      const data: string[] = await res.json();
      if (mounted) setImages(data);
    };
    fetchImages();
    return () => { mounted = false; };
  }, [folder]);

  // Auto flip functionality
  const startAutoFlip = () => {
    if (!bookRef.current || !images.length || !autoFlipMs) return;
    
    if (autoFlipIntervalRef.current) {
      clearInterval(autoFlipIntervalRef.current);
    }
    
    autoFlipIntervalRef.current = setInterval(() => {
      const flip = bookRef.current?.pageFlip?.();
      if (!flip) return;
      if (flip.getCurrentPageIndex() < images.length - 1) {
        flip.flipNext();
      } else {
        flip.flip(0);
      }
    }, autoFlipMs);
  };

  const stopAutoFlip = () => {
    if (autoFlipIntervalRef.current) {
      clearInterval(autoFlipIntervalRef.current);
      autoFlipIntervalRef.current = null;
    }
  };

  // Auto flip every autoFlipMs ms
  useEffect(() => {
    if (isAutoFlipEnabled) {
      startAutoFlip();
    } else {
      stopAutoFlip();
    }
    return () => stopAutoFlip();
  }, [images, autoFlipMs, isAutoFlipEnabled]);

  const toggleAutoFlip = () => {
    setIsAutoFlipEnabled(prev => !prev);
  };

  const handlePageClick = (index: number) => {
    setZoomedPage(prev => prev === index ? null : index);
  };



  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.controls}>
        <button
          className={`${styles.autoFlipBtn} ${isAutoFlipEnabled ? styles.active : ''} ${styles.blink}`}
          onClick={toggleAutoFlip}
          aria-label={isAutoFlipEnabled ? "Disable auto flip" : "Enable auto flip"}
        >
          {isAutoFlipEnabled ? '⏸' : '▶'}
        </button>
        <button className={styles.downloadBtn} onClick={async () => {
          if (!bookRef.current) return;
          const flip = bookRef.current.pageFlip();
          if (!flip) return;
          const currentIndex = flip.getCurrentPageIndex();
          let currentImage = images[currentIndex];
          if (!currentImage) return;
          try {
            // Fetch the image as blob to handle deployment URL issues
            const response = await fetch(currentImage);
            if (!response.ok) throw new Error('Failed to fetch image');
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = currentImage.split('/').pop() || 'image.webp';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
          }
        }} aria-label="Download current image">⬇️</button>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close album">✕</button>
      </div>

      <div className={styles.bookWrapper}>
        <HTMLFlipBook
  width={400}
  height={500}
  size="stretch"
  minWidth={315}
  maxWidth={1000}
  minHeight={400}
  maxHeight={1333}
  showCover={true}
  mobileScrollSupport={true}
  ref={bookRef}
  className={styles.book}
  {...( {} as any )}
>
  {images.map((src, index) => (
    <div
      key={index}
      className={`${styles.page} ${zoomedPage === index ? styles.zoomed : ""}`}
      onClick={() => handlePageClick(index)}
    >
      <img src={src} alt={`page-${index}`} />

    </div>
  ))}
</HTMLFlipBook>

      </div>
    </div>
  );
};

export default Album;
