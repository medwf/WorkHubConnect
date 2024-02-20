/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        // Proxy API requests
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*', // Replace with your Flask API URL
        },
      ]
    },
  };
  
  export default nextConfig;
  