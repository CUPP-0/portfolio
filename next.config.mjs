/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
  {
    protocol: "https",
    hostname: "example.com",
  },
  {
    protocol: "https",
    hostname: "avatar.vercel.sh",
  },
],
  },
};

export default nextConfig;