import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Toaster, { ToastProvider } from "@/components/ui/Toaster"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Quiz Pot",
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
        className={`${poppins.className} antialiased`}
      >
        <ToastProvider>
          { children }
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
}
