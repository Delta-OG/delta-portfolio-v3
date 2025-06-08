/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove Three.js related configurations to prevent SSR issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure static export compatibility
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

export default nextConfig
