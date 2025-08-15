/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      {
        source: "/blog/:path*",
        destination: "https://blog-temp.netlify.app/:path*",
        reactStrictMode: true,
        env: {
          SERVER_URL: process.env.SERVER_URL,
        },
      },
    ];
  },
};
