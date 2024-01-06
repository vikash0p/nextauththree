import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/next-auth/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next-Auth',
  description: 'Certainly! NextAuth.js is a powerful authentication library for JavaScript applications, enabling seamless authentication and authorization processes. Designed with simplicity and extensibility in mind, NextAuth.js integrates effortlessly with Next.js, making it an ideal choice for building secure and scalable web applications.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
