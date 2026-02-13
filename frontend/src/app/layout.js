import './globals.css'

export const metadata = {
  title: 'Grid Capture - Real-time Territory Game',
  description: 'Capture tiles in real-time and compete with other players',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

