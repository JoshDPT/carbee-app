/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: 'https://modulith.herokuapp.com/',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig
