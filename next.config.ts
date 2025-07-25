import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i1.hdslb.com',
        port: '',
        pathname: '/bfs/archive/**',
      },
      {
        protocol: 'https',
        hostname: 'i1.hdslb.com',
        port: '',
        pathname: '/bfs/archive/**',
      },
      {
        protocol: 'http',
        hostname: 'i2.hdslb.com',
        port: '',
        pathname: '/bfs/archive/**',
      },
      {
        protocol: 'https',
        hostname: 'i2.hdslb.com',
        port: '',
        pathname: '/bfs/archive/**',
      },
    ],
  },
};

export default nextConfig;
