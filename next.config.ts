import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: {
      ignore: [
        /\api\/stats/,
        /\api\/debug/,
      ],
    },
  },
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://pixabay.com/get/**')],
  },
}

export default nextConfig
