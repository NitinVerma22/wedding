
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Couple Names */}
        <div className={styles.coupleSection}>
          <div className={styles.groomSection}>
            <h3 className={styles.coupleTitle}>Groom</h3>
            <h2 className={styles.coupleName}>Rajesh Kumar</h2>
            <p className={styles.parentsLabel}>Son of</p>
            <p className={styles.parentsNames}>Mr. Suresh Kumar & Mrs. Sunita Kumar</p>
          </div>
          
          <div className={styles.heartDivider}>
            <span className={styles.heartIcon}>💕</span>
            <span className={styles.heartIcon}>💖</span>
            <span className={styles.heartIcon}>💕</span>
          </div>
          
          <div className={styles.brideSection}>
            <h3 className={styles.coupleTitle}>Bride</h3>
            <h2 className={styles.coupleName}>Priya Sharma</h2>
            <p className={styles.parentsLabel}>Daughter of</p>
            <p className={styles.parentsNames}>Mr. Rohit Sharma & Mrs. Kavita Sharma</p>
          </div>
        </div>

        {/* Event Details */}
        <div className={styles.eventsSection}>
          <h3 className={styles.eventsTitle}>Wedding Timeline</h3>
          <div className={styles.eventsGrid}>
            <div className={styles.eventItem}>
              <span className={styles.eventEmoji}>🌼</span>
              <div className={styles.eventDetails}>
                <h4>Haldi Ceremony</h4>
                <p>December 18, 2024</p>
                <p>10:00 AM - 12:00 PM</p>
              </div>
            </div>
            
            <div className={styles.eventItem}>
              <span className={styles.eventEmoji}>🌿</span>
              <div className={styles.eventDetails}>
                <h4>Mehndi Celebration</h4>
                <p>December 19, 2024</p>
                <p>4:00 PM - 8:00 PM</p>
              </div>
            </div>
            
            <div className={styles.eventItem}>
              <span className={styles.eventEmoji}>🎵</span>
              <div className={styles.eventDetails}>
                <h4>Sangeet Night</h4>
                <p>December 20, 2024</p>
                <p>7:00 PM - 11:00 PM</p>
              </div>
            </div>
            
            <div className={styles.eventItem}>
              <span className={styles.eventEmoji}>💒</span>
              <div className={styles.eventDetails}>
                <h4>Wedding Ceremony</h4>
                <p>December 21, 2024</p>
                <p>8:00 AM - 12:00 PM</p>
              </div>
            </div>
            
            <div className={styles.eventItem}>
              <span className={styles.eventEmoji}>🎉</span>
              <div className={styles.eventDetails}>
                <h4>Reception</h4>
                <p>December 21, 2024</p>
                <p>7:00 PM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Information */}
        <div className={styles.venueSection}>
          <h3 className={styles.venueTitle}>Wedding Venue</h3>
          <div className={styles.venueDetails}>
            <h4 className={styles.venueName}>The Grand Palace Hotel</h4>
            <p className={styles.venueAddress}>
              123 Wedding Street, Love City<br />
              Maharashtra, India - 400001
            </p>
            <p className={styles.venueContact}>
              📞 +91 98765 43210<br />
              📧 events@grandpalace.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.thanksMessage}>
            <p>Thank you for being part of our special day</p>
            <div className={styles.socialIcons}>
              <span>💕</span>
              <span>🌹</span>
              <span>💖</span>
              <span>🌸</span>
              <span>💕</span>
            </div>
          </div>
          <div className={styles.copyright}>
            <p>&copy; 2024 Rajesh & Priya Wedding. Made with ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
