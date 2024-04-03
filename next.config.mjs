/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "out",
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
