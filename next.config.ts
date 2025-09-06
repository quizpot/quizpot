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
}

export default nextConfig
