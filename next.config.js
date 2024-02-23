/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'd4cr-keystone-19d55dc6f889.herokuapp.com'], // Add your image domains here
    },
}

module.exports = nextConfig