import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tudominio.com/spiderman-brand-new-day",
      lastModified: new Date(),
    },
  ];
}
