
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AlbumViewer.module.css';

interface AlbumViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlbumViewer: React.FC<AlbumViewerProps> = ({ isOpen, onClose }) => {
  const [currentSpread, setCurrentSpread] = useState(0); // Index of the current spread (2 pages)
  const [allImages, setAllImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const albumRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  const events = ['haldi', 'mehndi', 'sangeet', 'wedding', 'reception'];
  const eventNames = ['Haldi', 'Mehndi', 'Sangeet', 'Wedding', 'Reception'];

  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      fetchAllImages();
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset'; // Restore scroll
    };
  }, [isOpen]);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || selectedImage) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSpread();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSpread();
    }
  }, [isOpen, selectedImage]);

  const fetchAllImages = async () => {
    setIsLoading(true);
    const albumData = [];
    
    // Cover page
    albumData.push({
      type: 'cover',
      title: 'Our Wedding Album',
      subtitle: 'Male & Female',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'
    });

    // Index page
    albumData.push({
      type: 'index',
      title: 'Table of Contents',
      events: eventNames.map((name, idx) => ({
        name,
        pageStart: 2 + (idx * 8),
        pageEnd: 2 + ((idx + 1) * 8) - 1
      }))
    });

    // Event pages
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      try {
        const response = await fetch(`/api/gallery/${event}`);
        const data = await response.json();
        
        // Event title page
        albumData.push({
          type: 'event-title',
          title: eventNames[i],
          image: data.heroImage,
          event: event
        });

        // Event images
        const images = data.images;
        for (let j = 0; j < images.length; j++) {
          albumData.push({
            type: 'image',
            image: images[j],
            event: event,
            eventTitle: eventNames[i]
          });
        }
      } catch (error) {
        console.error(`Error fetching ${event} images:`, error);
      }
    }

    // Add back cover
    albumData.push({
      type: 'back-cover',
      title: 'The End',
      subtitle: 'Thank you for celebrating with us',
      image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop'
    });

    setAllImages(albumData);
    setIsLoading(false);
    
    // Preload images
    preloadImages(albumData);
  };

  const preloadImages = (albumData: any[]) => {
    albumData.forEach((item, index) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
        imageRefs.current[index] = img;
      }
    });
  };

  const totalSpreads = Math.ceil(allImages.length / 2);

  const nextSpread = () => {
    if (currentSpread < totalSpreads - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSpread(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  const prevSpread = () => {
    if (currentSpread > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSpread(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 600);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart || !isDragging || isTransitioning) return;
    
    const currentTouch = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    };
    
    const deltaX = currentTouch.x - touchStart.x;
    const deltaY = Math.abs(currentTouch.y - touchStart.y);
    
    // Only process horizontal swipes
    if (deltaY < 50) {
      e.preventDefault();
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || !touchStart || !isDragging) return;
    
    const touch = e.changedTouches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY
    });
    
    const deltaX = touchStart.x - touch.clientX;
    const deltaY = Math.abs(touchStart.y - touch.clientY);
    
    // Only process horizontal swipes
    if (deltaY < 50 && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        nextSpread(); // Swipe left - next page
      } else {
        prevSpread(); // Swipe right - previous page
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
    setDragOffset(0);
  };

  const openImageFullscreen = (imageSrc: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(imageSrc);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the close button
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = leftPageIndex + 1;
  const leftPage = allImages[leftPageIndex];
  const rightPage = allImages[rightPageIndex];

  return (
    <div className={styles.albumOverlay} onClick={handleBackdropClick}>
      <div className={styles.albumContainer} ref={albumRef}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Opening your wedding album...</p>
          </div>
        ) : (
          <>
            <div 
              className={`${styles.albumBook} ${isMobile ? styles.mobile : styles.desktop}`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: isMobile && isDragging ? `translateX(${dragOffset * 0.5}px)` : undefined
              }}
            >
              {isMobile ? (
                // Mobile: Single page with peek
                <div className={styles.mobileView}>
                  <div className={styles.currentPage}>
                    {renderPageContent(leftPage)}
                  </div>
                  {rightPage && (
                    <div className={styles.peekPage}>
                      {renderPageContent(rightPage)}
                    </div>
                  )}
                </div>
              ) : (
                // Desktop: Two facing pages
                <div className={styles.desktopView}>
                  <div className={`${styles.page} ${styles.leftPage}`}>
                    {renderPageContent(leftPage)}
                  </div>
                  <div className={styles.bookSpine}></div>
                  <div className={`${styles.page} ${styles.rightPage}`}>
                    {renderPageContent(rightPage)}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className={styles.controls}>
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevSpread} 
                disabled={currentSpread === 0 || isTransitioning}
              >
                ◀
              </button>
              
              <div className={styles.pageIndicator}>
                <span className={styles.pageCount}>
                  {currentSpread + 1} / {totalSpreads}
                </span>
                <div className={styles.dotIndicators}>
                  {Array.from({ length: totalSpreads }, (_, i) => (
                    <div
                      key={i}
                      className={`${styles.dot} ${i === currentSpread ? styles.activeDot : ''}`}
                      onClick={() => setCurrentSpread(i)}
                    />
                  ))}
                </div>
              </div>
              
              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextSpread} 
                disabled={currentSpread >= totalSpreads - 1 || isTransitioning}
              >
                ▶
              </button>
            </div>
          </>
        )}

        {/* Fullscreen Image Viewer */}
        {selectedImage && (
          <div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
            <div className={styles.fullscreenContainer}>
              <img 
                src={selectedImage} 
                alt="Fullscreen view" 
                className={styles.fullscreenImage}
              />
              <button className={styles.fullscreenClose} onClick={closeFullscreen}>
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function renderPageContent(pageData: any) {
    if (!pageData) {
      return <div className={styles.emptyPage}></div>;
    }

    switch (pageData.type) {
      case 'cover':
      case 'back-cover':
        return (
          <div className={styles.coverPage}>
            <div className={styles.coverImage}>
              <img src={pageData.image} alt="Album Cover" />
            </div>
            <div className={styles.coverOverlay}>
              <h1 className={styles.coverTitle}>{pageData.title}</h1>
              <p className={styles.coverSubtitle}>{pageData.subtitle}</p>
              <div className={styles.decorativeElements}>
                <div className={styles.heartDecor}>💕</div>
              </div>
            </div>
          </div>
        );

      case 'index':
        return (
          <div className={styles.indexPage}>
            <h2 className={styles.indexTitle}>{pageData.title}</h2>
            <div className={styles.indexList}>
              {pageData.events.map((event: any, idx: number) => (
                <div key={idx} className={styles.indexItem}>
                  <span className={styles.eventName}>{event.name}</span>
                  <div className={styles.indexDots}></div>
                  <span className={styles.pageNumbers}>{event.pageStart}-{event.pageEnd}</span>
                </div>
              ))}
            </div>
            <div className={styles.indexDecoration}>
              <div className={styles.floralPattern}>🌸</div>
            </div>
          </div>
        );

      case 'event-title':
        return (
          <div className={styles.eventTitlePage}>
            <div className={styles.eventTitleImage}>
              <img src={pageData.image} alt={pageData.title} />
            </div>
            <div className={styles.eventTitleOverlay}>
              <h2 className={styles.eventTitle}>{pageData.title}</h2>
              <div className={styles.titleDecoration}>
                <div className={styles.ornament}>✨</div>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className={styles.imagePage}>
            <div 
              className={styles.imageContainer} 
              onClick={(e) => openImageFullscreen(pageData.image, e)}
            >
              <img src={pageData.image} alt={`${pageData.eventTitle} memory`} />
              <div className={styles.imageOverlay}>
                <span className={styles.zoomIcon}>🔍</span>
              </div>
            </div>
          </div>
        );

      default:
        return <div className={styles.emptyPage}></div>;
    }
  }
};

export default AlbumViewer;
