/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    DOMAIN_URL: process.env.DOMAIN_URL,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    DOMAIN_URL: process.env.DOMAIN_URL,
  },
	async rewrites() {
		return [
			{
				source: '/server/:path*',
				destination: 'http://modulith.herokuapp.com/:path*',
			},
		];
	},
	async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
