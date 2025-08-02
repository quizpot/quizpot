import type { Metadata } from "next"
import "./globals.css"
import Toaster, { ToastProvider } from "@/components/ui/Toaster"

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
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ToastProvider>
          { children }
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
}
