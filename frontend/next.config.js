/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['m.media-amazon.com','static.wikia.nocookie.net','i.pinimg.com','flxt.tmsimg.com'],
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