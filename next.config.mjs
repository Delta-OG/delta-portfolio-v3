/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Simplified configuration for better deployment compatibility
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // Disable experimental features that might cause issues
  experimental: {
    optimizePackageImports: [],
  },
}

export default nextConfig
