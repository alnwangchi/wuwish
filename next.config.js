/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9527',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.wuwish.com.tw',
        port: '9527',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
