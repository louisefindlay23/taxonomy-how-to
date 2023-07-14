/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  return {
    reactStrictMode: true,
    images: {
      unoptimized: true
    }
  };
};

module.exports = nextConfig;
