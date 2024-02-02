/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.twelvedata.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "logo.twelvedata.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
