"use client";

import { useEffect, useState } from "react";

type Props = {
  releaseDate: string;
  country: string;
};

type TimeLeft = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: Date): TimeLeft | null {
  const now = new Date();

  if (targetDate <= now) return null;

  let months =
    (targetDate.getFullYear() - now.getFullYear()) * 12 +
    (targetDate.getMonth() - now.getMonth());

  const tempDate = new Date(now);
  tempDate.setMonth(tempDate.getMonth() + months);

  if (tempDate > targetDate) {
    months--;
    tempDate.setMonth(tempDate.getMonth() - 1);
  }

  let diff = targetDate.getTime() - tempDate.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);

  return { months, days, hours, minutes, seconds };
}

export default function Countdown({ releaseDate, country }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(`${releaseDate}T00:00:00`);

    const tick = () => {
      setTimeLeft(calculateTimeLeft(target));
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [releaseDate]);

  if (!timeLeft) {
    return <div className="text-center">¡Ya se estrenó!</div>;
  }

return (
  <section className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
    {/* Título principal - VERDE METÁLICO */}
    <div className="relative z-10 w-full max-w-4xl">
      <h1 className="text-5xl md:text-5xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-900 [text-shadow:_0_1px_0_rgba(16,185,129,0.4),_0_2px_0_rgba(5,150,105,0.3),_0_3px_0_rgba(4,120,87,0.2),_0_8px_12px_rgba(6,78,59,0.4)] drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
        Avengers: Doomsday
      </h1>

      <p className="text-emerald-300/70 text-xs md:text-sm mb-12 font-light tracking-widest uppercase text-center">
        Fecha de estreno en {country}
      </p>

      {/* Countdown - Estilo digital con separadores */}
      <div className="flex items-baseline justify-center gap-2 md:gap-3 mb-6 tabular-nums">
        <TimeBox value={timeLeft.months} label="Meses" />
        <span className="text-4xl md:text-6xl font-bold text-emerald-400/60">:</span>
        <TimeBox value={timeLeft.days} label="Días" />
        <span className="text-4xl md:text-6xl font-bold text-emerald-400/60">:</span>
        <TimeBox value={timeLeft.hours} label="Horas" />
        <span className="text-4xl md:text-6xl font-bold text-emerald-400/60">:</span>
        <TimeBox value={timeLeft.minutes} label="Minutos" />
        <span className="text-4xl md:text-6xl font-bold text-emerald-400/60">:</span>
        <TimeBox value={timeLeft.seconds} label="Segundos" />
      </div>
    </div>
  </section>
);
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl md:text-6xl font-bold font-mono text-emerald-100 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] min-w-[2ch] text-center">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-emerald-400/80 font-semibold mt-2 opacity-70">
        {label}
      </span>
    </div>
  );
}