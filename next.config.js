/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL:
      process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
  },
  async rewrites() {
    return [
      {
        source: "/chessknight/:path*",
        destination: "https://admiring-spence-c56151.netlify.app/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/:path*",
        destination: "/tech/:path*",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/tech",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
