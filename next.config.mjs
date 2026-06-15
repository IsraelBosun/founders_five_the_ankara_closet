/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      { pathname: '/products/**' },
      { pathname: '/photos/**' },
      { pathname: '/ankara_logo.png' },
    ],
  },
};

export default nextConfig;
