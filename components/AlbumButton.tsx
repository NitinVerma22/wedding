import React from "react";
import styles from "./AlbumButton.module.css";
import Album from "./Album";
import { useAlbum } from "../contexts/AlbumContext";

const AlbumButton: React.FC = () => {
  const { isAlbumOpen, openAlbum, closeAlbum } = useAlbum();

  return (
    <div>
      {/* Floating Album Button */}
      <button
        className={styles.albumButton}
        onClick={() => openAlbum()}
        aria-label="Open Album"
      >📖</button>

      {/* Album Full Page Zoom */}
      {isAlbumOpen && (
        <Album onClose={closeAlbum} />
      )}
    </div>
  );
};

export default AlbumButton;
