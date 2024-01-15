export const metadata = {
  title: 'D4CR',
  description: 'designing for children\'s rights',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
