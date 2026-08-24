import { getSortedPostsData as getBlogPostsData } from "../../lib/blogPosts";
import { getSortedPostsData as getTravelPostsData } from "../../lib/travelPosts";

const baseUrl = "https://sandeepmadavu.com";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function createUrlEntry(path, lastModified) {
  return `
    <url>
      <loc>${escapeXml(`${baseUrl}${path}`)}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>`;
}

export async function getServerSideProps({ res }) {
  const today = new Date().toISOString().split("T")[0];
  const staticRoutes = ["", "/travel", "/tech", "/archive", "/about"];
  const blogRoutes = getBlogPostsData().map((post) => `/tech/${post.id}`);
  const travelRoutes = getTravelPostsData().map((post) => `/travel/${post.id}`);

  const urls = [...staticRoutes, ...blogRoutes, ...travelRoutes]
    .map((path) => createUrlEntry(path, today))
    .join("");

  res.setHeader("Content-Type", "text/xml");
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
  </urlset>`);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
