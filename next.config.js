/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: "/blog/:path*",
        destination: "https://blog-temp.netlify.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
