/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              hostname: '127.0.0.1',
          },
          {
              hostname: 'localhost',
          },
          {
              hostname: '100.25.170.62',
          },
          {
              hostname: 'avatars.githubusercontent.com',
          }
      ],
  },
//   compiler: {
//     removeConsole: {
//       exclude: ['error'],
//     },
//   },
}

module.exports = nextConfig;
