/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true
    };
    return config;
  },
  compiler: {
    emotion: true
  }
};

export default nextConfig;
