
import React, { useState, useEffect } from 'react';
import styles from './AlbumViewer.module.css';

interface AlbumViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlbumViewer: React.FC<AlbumViewerProps> = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [allImages, setAllImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  const events = ['haldi', 'mehndi', 'sangeet', 'wedding', 'reception'];
  const eventNames = ['Haldi', 'Mehndi', 'Sangeet', 'Wedding', 'Reception'];

  useEffect(() => {
    if (isOpen) {
      fetchAllImages();
      checkOrientation();
      window.addEventListener('orientationchange', checkOrientation);
      window.addEventListener('resize', checkOrientation);
    }
    return () => {
      window.removeEventListener('orientationchange', checkOrientation);
      window.removeEventListener('resize', checkOrientation);
    };
  }, [isOpen]);

  const checkOrientation = () => {
    const isLandscapeMode = window.innerWidth > window.innerHeight;
    setIsLandscape(isLandscapeMode);
  };

  const fetchAllImages = async () => {
    setIsLoading(true);
    const albumData = [];
    
    // Cover page
    albumData.push({
      type: 'cover',
      title: 'Our Wedding Album',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop'
    });

    // Index page
    albumData.push({
      type: 'index',
      title: 'Index',
      events: eventNames.map((name, idx) => ({
        name,
        pageStart: 2 + (idx * 12), // Each event gets ~10 pages
        pageEnd: 2 + ((idx + 1) * 12) - 1
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

        // Event images (2 per page)
        const images = data.images;
        for (let j = 0; j < images.length; j += 2) {
          albumData.push({
            type: 'images',
            leftImage: images[j],
            rightImage: images[j + 1] || null,
            event: event,
            eventTitle: eventNames[i]
          });
        }
      } catch (error) {
        console.error(`Error fetching ${event} images:`, error);
      }
    }

    setAllImages(albumData);
    setIsLoading(false);
  };

  const nextPage = () => {
    if (currentPage < allImages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const openImageFullscreen = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.albumOverlay}>
      <div className={styles.albumContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {!isLandscape && window.innerWidth <= 768 && (
          <div className={styles.orientationMessage}>
            📱 For the best experience, please rotate your device to landscape mode
          </div>
        )}

        {isLoading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading your wedding album...</p>
          </div>
        ) : (
          <>
            <div className={styles.albumBook}>
              <div className={`${styles.page} ${styles.leftPage}`}>
                {renderPageContent(allImages[currentPage], 'left')}
              </div>
              <div className={`${styles.page} ${styles.rightPage}`}>
                {renderPageContent(allImages[currentPage + 1], 'right')}
              </div>
              <div className={styles.bookSpine}></div>
            </div>

            <div className={styles.controls}>
              <button 
                className={styles.navButton} 
                onClick={prevPage} 
                disabled={currentPage === 0}
              >
                ◀ Previous
              </button>
              
              <div className={styles.pageInfo}>
                Page {currentPage + 1} of {allImages.length}
              </div>
              
              <button 
                className={styles.navButton} 
                onClick={nextPage} 
                disabled={currentPage >= allImages.length - 1}
              >
                Next ▶
              </button>
            </div>
          </>
        )}

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

  function renderPageContent(pageData: any, side: 'left' | 'right') {
    if (!pageData) {
      return <div className={styles.emptyPage}></div>;
    }

    switch (pageData.type) {
      case 'cover':
        return (
          <div className={styles.coverPage}>
            <div className={styles.coverImage}>
              <img src={pageData.image} alt="Wedding Album Cover" />
            </div>
            <div className={styles.coverOverlay}>
              <h1 className={styles.coverTitle}>{pageData.title}</h1>
              <div className={styles.coverHearts}>💕 Male & Female 💕</div>
            </div>
          </div>
        );

      case 'index':
        return (
          <div className={styles.indexPage}>
            <h2 className={styles.indexTitle}>Index</h2>
            <div className={styles.indexList}>
              {pageData.events.map((event: any, idx: number) => (
                <div 
                  key={idx} 
                  className={styles.indexItem}
                  onClick={() => goToPage(event.pageStart)}
                >
                  <span className={styles.eventName}>{event.name}</span>
                  <span className={styles.dots}>........................</span>
                  <span className={styles.pageNumbers}>{event.pageStart}-{event.pageEnd}</span>
                </div>
              ))}
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
            </div>
          </div>
        );

      case 'images':
        return (
          <div className={styles.imagesPage}>
            {side === 'left' && pageData.leftImage && (
              <div className={styles.imageContainer} onClick={() => openImageFullscreen(pageData.leftImage)}>
                <img src={pageData.leftImage} alt={`${pageData.eventTitle} memory`} />
                <div className={styles.imageOverlay}>
                  <span className={styles.zoomIcon}>🔍</span>
                </div>
              </div>
            )}
            {side === 'right' && pageData.rightImage && (
              <div className={styles.imageContainer} onClick={() => openImageFullscreen(pageData.rightImage)}>
                <img src={pageData.rightImage} alt={`${pageData.eventTitle} memory`} />
                <div className={styles.imageOverlay}>
                  <span className={styles.zoomIcon}>🔍</span>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return <div className={styles.emptyPage}></div>;
    }
  }
};

export default AlbumViewer;
