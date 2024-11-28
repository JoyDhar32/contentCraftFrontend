import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
  },
};
export default nextConfig;
