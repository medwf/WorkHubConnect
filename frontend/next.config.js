/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['127.0.0.1', 'localhost','100.25.170.62'],
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