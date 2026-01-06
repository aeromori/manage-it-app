const withFlowbiteReact = require("flowbite-react/plugin/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "png.pngtree.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

module.exports = withFlowbiteReact(nextConfig);