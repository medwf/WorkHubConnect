/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['127.0.0.1', 'localhost'],
      },
//   async rewrites() {
//     return [
//         {
//             source: '/:slug*',
//             destination: 'http://localhost:5000/:slug*'
//         },
//     ]
// },
}
 
module.exports = nextConfig