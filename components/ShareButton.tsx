import React from "react";
import styles from "./ShareButton.module.css";

const ShareButton: React.FC = () => {
  const handleShare = async () => {
    const url = window.location.href;
    const message = `Welcome to our beautiful marriage website! Join us in celebrating love and our wedding journey at ${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Our Marriage Website",
          text: message,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${message} ${url}`).then(() => {
        alert("Link and message copied to clipboard!");
      }).catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
    }
  };

  return (
    <button
      className={styles.shareButton}
      onClick={handleShare}
      aria-label="Share Website"
    >
      ➦
    </button>
  );
};

export default ShareButton;
