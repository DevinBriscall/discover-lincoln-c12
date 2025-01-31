/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.ca-central-1.amazonaws.com'], // Add your image domain here
  },  
};

export default nextConfig;
