import NavBar from './components/NavBar'
import AuthContext from './context/AuthContext'
import './globals.css'
import 'react-datepicker/dist/react-datepicker.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.ico" sizes="any" />
      <body className={inter.className}>
        <main className="w-screen min-h-screen bg-gray-100">
          <AuthContext>
            <main className="m-auto bg-white max-w-screen-2xl">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
      </body>
    </html>
  )
}
