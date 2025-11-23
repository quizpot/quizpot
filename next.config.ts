import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'

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

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
