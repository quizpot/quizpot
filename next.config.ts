import type { NextConfig } from "next"
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  logging: {
    incomingRequests: {
      ignore: [
        /\api\/stats/,
        /\api\/debug/,
        /undefined/,
      ],
    },
  },
  devIndicators: false,
  images: {
    remotePatterns: [new URL('https://pixabay.com/get/**')],
  },
  transpilePackages: ["@quizpot/quizcore"],
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
