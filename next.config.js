/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "bucketeer-1f163294-7339-4eb0-af5c-400b0ce7209a.s3.eu-west-1.amazonaws.com",
            },
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
