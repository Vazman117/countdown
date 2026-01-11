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

export default function Countdown({ releaseDate}: Props) {
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
    <section className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden bg-black">
      {/* Fondo con efecto de telaraña sutil */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <div className="absolute inset-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, rgba(220, 38, 38, 0.1) 50%, transparent 100%)`
        }}></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Título - estilo Spider-Man */}
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-wider text-center relative">
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-600 to-red-950 [text-shadow:_0_0_20px_rgba(239,68,68,0.5),_0_0_40px_rgba(220,38,38,0.3)]">
            SPIDER-MAN
          </span>
        </h1>

        {/* Subtítulo dorado */}
        <p className="text-center text-yellow-500 text-base md:text-lg font-bold tracking-[0.3em] mb-8 uppercase [text-shadow:_0_0_10px_rgba(234,179,8,0.5)]">
          Brand New Day
        </p>

        {/* Fecha de estreno */}
        <div className="text-center mb-10">
          <time 
            dateTime="2026-07-31"
            className="inline-block px-6 py-2 text-base md:text-lg font-bold text-yellow-400 border-2 border-red-600/50 rounded-md bg-red-950/20 [text-shadow:_0_0_10px_rgba(234,179,8,0.5)] tracking-widest"
          >
            31 • JULIO • 2026
          </time>
        </div>

        {/* Countdown - Diseño inspirado en la estética de Spider-Man */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-6 px-2">
          <TimeBox value={timeLeft.months} label="Meses" />
          <Separator />
          <TimeBox value={timeLeft.days} label="Días" />
          <Separator />
          <TimeBox value={timeLeft.hours} label="Horas" />
          <Separator />
          <TimeBox value={timeLeft.minutes} label="Minutos" />
          <Separator />
          <TimeBox value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-white via-red-100 to-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)] min-w-[2ch] text-center inline-block">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[0.6rem] sm:text-xs md:text-sm uppercase tracking-[0.15em] sm:tracking-[0.25em] text-yellow-400 font-bold mt-1.5 sm:mt-2 md:mt-3 [text-shadow:_0_0_8px_rgba(234,179,8,0.4)]">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-600/40 drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]">
      :
    </div>
  );
}