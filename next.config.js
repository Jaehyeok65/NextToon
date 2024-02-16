/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns : [
        {
          hostname : 'firebasestorage.googleapis.com'
        }
      ]
    }
  };
  
  module.exports = nextConfig;

  //domains: ['firebasestorage.googleapis.com'],