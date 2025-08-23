/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**", // allows all GitHub user avatars
      },
      {
        protocol: "https",
        hostname: "ibb.co.com", 
        port: "",
        pathname: "/**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
