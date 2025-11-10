import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Audiobook Producer | AI-Powered Text-to-Audio',
  description: 'Transform your manuscripts into polished, lifelike audiobooks automatically. From raw text to ready-to-listen in three effortless steps.',
  keywords: ['audiobook', 'text-to-speech', 'AI', 'automation', 'TTS', 'audio production'],
  authors: [{ name: 'Prasad Pagade' }],
  openGraph: {
    title: 'Audiobook Producer',
    description: 'AI-powered audiobook generation from text',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
