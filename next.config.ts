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
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development' ? true : false,
    remotePatterns: [
      new URL('https://pixabay.com/get/**'),
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8333',
        pathname: '/quizpot-uploads/**',
      },
      new URL(process.env.NEXT_PUBLIC_S3_PUBLIC_URL + '**'),
    ],
  },
  transpilePackages: ["@quizpot/quizcore"],
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
