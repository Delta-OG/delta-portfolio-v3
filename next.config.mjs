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
  // Remove static export for now to allow dynamic routes
  // We can add it back later if needed for specific deployment targets
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

export default nextConfig
