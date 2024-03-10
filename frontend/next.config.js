/** @type {import('next').NextConfig} */
const nextConfig = {
    // compiler: {
    //     removeConsole: true,
    //   },
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
          },
          {
        
            hostname: '34.229.66.77',

        },{
            hostname : 'workhubconnect.me'
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
