import type { Metadata } from 'next'
import { NextTamaguiProvider } from './NextTamaguiProvider'

export const metadata: Metadata = {
  title: 'AR Face Tattoo Preview',
  description:
    'An Augmented Reality Tattoo Previewer Proof of Concept by Ignacio Castro for CoCreate powered by AI',
  icons: '/favicon.ico',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      <body>
        <iframe
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            left: '0',
            top: '0',
            zIndex: 0,
            border: 0,
          }}
          src={'https://jicninja.github.io/cool-background/'}
        ></iframe>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  )
}
