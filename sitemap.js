import { MetadataRoute } from "next";

export default async function sitemap() {
  const baseUrl = "https://sandeepmadavu.com";

  // Static routes
  const routes = ["", "/travel", "/tech", "/archive", "/about"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    }),
  );

  return [...routes];
}
