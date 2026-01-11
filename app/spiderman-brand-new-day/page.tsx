import { headers } from "next/headers";
import Countdown from "../components/Countdown";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Spider-Man Brand New Day: Cuenta regresiva de estreno",
  description: "Descubre cuántos días, horas y minutos faltan para el estreno de Spider-Man Brand New Day en tu región. Countdown actualizado en tiempo real.",
};

function isLatam(country?: string) {
  const latam = ["MX", "AR", "CL", "CO", "PE", "BR"];
  return country ? latam.includes(country) : false;
}

export default async function Page() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") || "US";

  const releaseDate = isLatam(country)
    ? "2026-07-31"
    : "2026-07-31";

  return (
    <main className="min-h-screen flex items-center justify-center">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Spider-Man: Brand New Day",
      startDate: "2026-07-31",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: {
        "@type": "VirtualLocation",
        url: "https://tudominio.com/spiderman-brand-new-day"
      },
      description:
        "Cuenta regresiva para el estreno de Spider-Man: Brand New Day. Descubre cuántos días faltan para su estreno."
    }),
  }}
/> 

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          "name": "¿Cuándo se estrena Spider-Man Brand New Day?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Spider-Man Brand New Day se estrena el 31 de julio de 2026."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto falta para el estreno de Spider-Man Brand New Day?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "En esta página puedes ver un contador en tiempo real con los meses, días, horas y minutos restantes."
          }
        }
      ]
    }),
  }}
/>

      <Countdown releaseDate={releaseDate} country={country} />
    </main>
  );
}

