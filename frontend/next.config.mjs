/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        // Proxy API requests
        {
          source: '/:path*',
          destination: 'http://localhost:4000/:path*', // Replace with your Flask API URL
        },
      ]
    },
  };
  
  export default nextConfig;
  