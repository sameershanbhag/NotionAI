import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import Provider from '@/components/Provider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
	<>
	  <SpeedInsights/>
	  <ClerkProvider>
		<html lang="en">
		  <Provider>
		    <body className={inter.className}>{children}</body>
		  </Provider>
		</html>
	  </ClerkProvider>
	</>
  )
}
