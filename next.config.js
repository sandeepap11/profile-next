/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  async rewrites() {
    return [
      {
        source: "/chessknight/:path*",
        destination: "https://admiring-spence-c56151.netlify.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
