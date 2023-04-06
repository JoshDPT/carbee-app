/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/',
	// 			destination: 'https://modulith.herokuapp.com/',
	// 		},
	// 	];
	// },
};

// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: '/:path*',
//         destination: 'https://modulith.herokuapp.com/:path*',
//       },
//     ];
//   },
// }

module.exports = nextConfig;
