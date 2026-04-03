import { Inter, Anton, Lora } from 'next/font/google'
import './globals.css'

// The UI font
const inter = Inter({ subsets: ['latin'] })

// The Card Title font (Thick, condensed, heavy)
const anton = Anton({ 
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-anton'
})

// The Card Body font (Clean, legible serif)
const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora'
})

export const metadata = {
  title: 'Daggerheart Card Forge',
  description: 'A digital binder and print layout tool for Daggerheart homebrew.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* We inject all three font variables into the main body tag */}
      <body className={`${inter.className} ${anton.variable} ${lora.variable}`}>
        {children}
      </body>
    </html>
  )
}