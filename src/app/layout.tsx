export const metadata = {
  title: 'PT. ANDIKA PRATAMA',
  description: 'Solusi Kerja Premium',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
