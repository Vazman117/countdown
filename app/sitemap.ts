import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://countdown-two-topaz.vercel.app/spiderman-brand-new-day",
      lastModified: new Date(),
    },
  ];
}
