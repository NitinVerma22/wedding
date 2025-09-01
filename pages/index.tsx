import type { NextPage } from "next";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import AudioPlayer from "../components/AudioPlayer";
import Button from "../components/AlbumButton";
import ShareButton from "../components/ShareButton";
import FlowerRain from "../components/FlowerRain";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div>
      <Header
        name="Male & Female"
        nav={["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"]}
      />
      <section className={styles.hero}>
        <FlowerRain trigger={Date.now()} id="home-flowers" />
        <video className={styles.heroVideo} autoPlay muted loop playsInline>
          <source src="/jayamal-video.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/desktop-video.mp4" type="video/mp4" media="(min-width: 769px)" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Celebrating Love</h1>
          <p className={styles.heroSubtitle}>
            Join us in our beautiful journey
          </p>
          <button className={styles.heroButton}>View Gallery</button>
        </div>
      </section>
      <main className={styles.main}>
        <section className={styles.eventsSection}>
          <h2 className={styles.sectionTitle}>Our Wedding Journey</h2>
          <div className={styles.eventsGrid}>
            <EventCard
              title="Haldi"
              image="/haldi.png"
              description="A traditional ceremony with turmeric paste, bringing good luck and prosperity"
              link="/haldi"
            />
            <EventCard
              title="Mehndi"
              image="/mehndi.png"
              description="Beautiful henna designs and celebration with music and dance"
              link="/mehndi"
            />
            <EventCard
              title="Sangeet"
              image="/sangeet.png"
              description="Musical night filled with performances, laughter, and joy"
              link="/sangeet"
            />
            <EventCard
              title="Wedding"
              image="/wedding.png"
              description="The sacred ceremony where two hearts become one forever"
              link="/wedding"
            />
            <EventCard
              title="Reception"
              image="/reception.png"
              description="Celebration dinner with family and friends to honor the newlyweds"
              link="/reception"
            />
            <EventCard
              title="Album"
              image="/album.png"
              description="Complete collection of all our beautiful wedding moments and memories"
              link="/album"
            />
          </div>
        </section>
      </main>
      <Footer />
      <Button />
      <AudioPlayer pageName="Wedding" />
      <ShareButton />

    </div>
  );
};

export default Home;
