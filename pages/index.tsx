import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import AudioPlayer from "../components/AudioPlayer";
import AlbumButton from "../components/AlbumButton";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Header name="Male & Female" nav={["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"]} />
      <section className={styles.hero}>
        <video 
          className={styles.heroVideo}
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/jayamal-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Celebrating Love</h1>
          <p className={styles.heroSubtitle}>Join us in our beautiful journey</p>
          <button className={styles.heroButton}>View Gallery</button>
        </div>
        <div className={styles.flowerRain}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`${styles.flower} ${styles[`flower${i % 5}`]}`}>
              🌸
            </div>
          ))}
          {[...Array(15)].map((_, i) => (
            <div key={i + 20} className={`${styles.flower} ${styles[`flower${i % 5}`]}`}>
              🌺
            </div>
          ))}
          {[...Array(15)].map((_, i) => (
            <div key={i + 35} className={`${styles.flower} ${styles[`flower${i % 5}`]}`}>
              🌹
            </div>
          ))}
        </div>
      </section>
      <main className={styles.main}>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>Our Wedding Journey</h2>
          <div className={styles.eventsGrid}>
            <EventCard
              title="Haldi"
              image="/images/haldi.jpg"
              description="A traditional ceremony with turmeric paste, bringing good luck and prosperity"
              link="/haldi"
            />
            <EventCard
              title="Mehndi"
              image="/images/mehndi.jpg"
              description="Beautiful henna designs and celebration with music and dance"
              link="/mehndi"
            />
            <EventCard
              title="Sangeet"
              image="/images/sangeet.jpg"
              description="Musical night filled with performances, laughter, and joy"
              link="/sangeet"
            />
            <EventCard
              title="Wedding"
              image="/images/wedding.jpg"
              description="The sacred ceremony where two hearts become one forever"
              link="/wedding"
            />
            <EventCard
              title="Reception"
              image="/images/reception.jpg"
              description="Celebration dinner with family and friends to honor the newlyweds"
              link="/reception"
            />
          </div>
        </section>
      </main>
      <Footer />
      <AudioPlayer audioSrc="/audio/home-music.mp3" pageName="Wedding" />
      <AlbumButton />
    </div>
  );
};

export default Home;