/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "d4cr-keystone-19d55dc6f889.herokuapp.com",
            },
            {
              protocol: "http",
              hostname: "localhost",
            },
            {
              protocol: "https",
              hostname: "ryds.se", // delete this one!
            },
            // Add your image domains here
        ],
    },
}

module.exports = nextConfig
