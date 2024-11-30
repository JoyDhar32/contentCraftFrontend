import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn-icons-png.flaticon.com'], // Add the domain here
  },
};

module.exports = {
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
  },
};
export default nextConfig;
