import type { NextConfig } from "next";
const WebpackObfuscator = require('webpack-obfuscator');

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator({
          rotateStringArray: true,
          compact: true,
        })
      );
    }
    return config;
  },
};

export default nextConfig;
