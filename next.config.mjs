/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      { pathname: '/products/**' },
      { pathname: '/photos/**' },
      { pathname: '/ankara_logo.png' },
      { pathname: '/ankara_logo1.png' },
    ],
  },
};

export default nextConfig;
