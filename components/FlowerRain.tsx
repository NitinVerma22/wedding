"use client";

import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface FlowerRainProps {
  trigger?: number;
  id?: string; // New prop for unique ID
}

const FlowerRain = ({ trigger, id }: FlowerRainProps) => {
  // सही type use कर
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id={id || "tsparticles"} // Use the unique ID or fallback to default
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        particles: {
          number: { value: 20 },
          move: {
            direction: "bottom",
            enable: true,
            speed: 2,
            outModes: { default: "out" },
          },
          opacity: { value: 0.9 },
          rotate: {
            random: true,
            direction: "random",
            animation: { enable: true, speed: 5 },
          },
          size: {
            value: 25,
            random: { enable: true, minimumValue: 15 },
          },
          shape: {
            type: "image",
            image: [
              { src: "/images/flower-1.png", width: 32, height: 32 },
              { src: "/images/flower-2.png", width: 32, height: 32 },
              { src: "/images/flower-3.png", width: 32, height: 32 },
            ],
          },
        },
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    />
  );
};

export default FlowerRain;
