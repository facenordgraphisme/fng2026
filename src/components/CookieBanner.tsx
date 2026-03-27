'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-white dark:bg-[#1a1a1a] border-t border-gray-200 dark:border-white/10 shadow-2xl transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[#666666] dark:text-[#a1a1aa] leading-relaxed flex-1">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
            En continuant à naviguer, vous acceptez notre utilisation des cookies. 
            Pour en savoir plus, consultez notre{' '}
            <Link href="/politique-de-confidentialite" className="text-[#239ea0] dark:text-white hover:underline transition-colors focus:outline-none">
              politique de confidentialité
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={handleDecline}
            className="flex-1 md:flex-none px-5 py-2.5 text-sm font-medium text-[#1a1a1a] dark:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-colors focus:outline-none"
          >
            Refuser
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold text-white bg-[#239ea0] hover:bg-[#1a1a1a] dark:hover:bg-white dark:hover:text-[#1a1a1a] rounded-full transition-colors focus:outline-none"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
