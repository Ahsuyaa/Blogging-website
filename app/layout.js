'use client'
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer"
import Provider from './SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NavBar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
