import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
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
        <h1>Welcome to our Wedding Celebration</h1>
      </main>
    </div>
  );
};

export default Home;