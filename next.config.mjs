/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      { pathname: '/products/**' },
      { pathname: '/photos/**' },
    ],
  },
};

export default nextConfig;
