import type { Metadata } from "next"
import "./globals.css"
import Toaster, { ToastProvider } from "@/components/ui/Toaster"
import Script from "next/script";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "Quizpot",
  description: "A pot for all of your quizzes!",
  icons: {
    icon: [
      { url: '/img/favicon_light.png' },
      { url: '/img/favicon_dark.png', media: '(prefers-color-scheme: dark)' },
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        { process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_ID && <Script defer src={ process.env.NEXT_PUBLIC_UMAMI_URL } data-website-id={ process.env.NEXT_PUBLIC_UMAMI_ID } /> }
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            { children }
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
