"use client";

import { useEffect, useState } from "react";

type Props = {
  releaseDate: string;
  country: string;
};

export default function Countdown({ releaseDate, country }: Props) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const target = new Date(`${releaseDate}T00:00:00`);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("¡Ya se estrenó!");
        return;
      }

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeLeft(
        `${days} días ${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [releaseDate]);

  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold mb-2">
        Avengers: Doomsday
      </h1>
      <p className="text-sm mb-4">
        Fecha de estreno en tu región ({country})
      </p>
      <div className="text-2xl font-mono">
        {timeLeft}
      </div>
    </section>
  );
}
