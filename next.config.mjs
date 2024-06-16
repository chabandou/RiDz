/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["i.fuelapi.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
