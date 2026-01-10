import { headers } from "next/headers";
import Countdown from "./components/Countdown";

export const runtime = "edge";

function isLatam(country?: string) {
  const latam = ["MX", "AR", "CL", "CO", "PE", "BR"];
  return country ? latam.includes(country) : false;
}

export default async function Page() {
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country") || "US";

  const releaseDate = isLatam(country)
    ? "2026-12-17"
    : "2026-12-18";

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Countdown releaseDate={releaseDate} country={country} />
    </main>
  );
}
