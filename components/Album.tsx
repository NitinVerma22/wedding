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

  const handleShare = (imageSrc: string) => {
    const message = `Check out this beautiful moment from ${coupleNames}'s wedding! ${imageSrc} View more at ${window.location.origin}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
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
      <button
        className={styles.shareBtn}
        onClick={(e) => { e.stopPropagation(); handleShare(src); }}
        aria-label="Share image on WhatsApp"
      >
        📤
      </button>
    </div>
  ))}
</HTMLFlipBook>

      </div>
    </div>
  );
};

export default Album;
