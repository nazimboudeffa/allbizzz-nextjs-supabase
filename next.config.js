/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FB_ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    }
}

module.exports = nextConfig
