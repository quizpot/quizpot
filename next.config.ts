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
}

export default nextConfig
