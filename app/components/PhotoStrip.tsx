"use client"

import { useEffect, useState } from 'react'
import { Photo } from '../types'

interface PhotoStripProps {
  photos: Photo[]
  onDownload: () => void
  onRetake: () => void
}

export default function PhotoStrip({ photos, onDownload, onRetake }: PhotoStripProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {

    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const formatDate = () => {
    const now = new Date()
    const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const day = String(now.getDate()).padStart(2, '0')
    const year = now.getFullYear()
    return `${month} ${day}, ${year}`
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
      {/* Analog Effects */}
      <div className="analog-overlay" />
      <div className="vignette" />
      <div className="scanlines" />

      {/* Photo Strip - Küçültülmüş */}
      <div 
        className={`
          fixed left-1/2 bg-[#f5f5f0] shadow-2xl z-10 transition-all duration-[2000ms] ease-out
          ${isVisible ? 'bottom-24' : 'bottom-[-500px]'}
        `}
        style={{
          width: '220px', // 300px'den 220px'e düştü
          transform: `translateX(-50%) rotate(${isVisible ? '-1.5deg' : '0deg'})`,
          padding: '16px 12px', // padding küçültüldü
        }}
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              rgba(0, 0, 0, 0.03) 1px,
              transparent 2px
            )`
          }}
        />

    
        <div className="relative space-y-3">
          {photos.map((photo, index) => (
     <div 
     key={photo.id}
     className="relative w-full bg-black overflow-hidden"
     style={{ aspectRatio: '1/1' }}
   >
     <img 
       src={photo.dataUrl} 
       alt={`Photo ${index + 1}`}
       className="w-full h-full object-cover"
       style={{ 
         filter: 'saturate(0) contrast(3) brightness(1.15) grayscale(1)',
       }}
     />
     
     {/* Film Grain Overlay - Photo booth texture */}
     <div 
       className="absolute inset-0 pointer-events-none opacity-40"
       style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
         mixBlendMode: 'overlay',
       }}
     />
     
     {/* Dust and scratches overlay */}
     <div 
       className="absolute inset-0 pointer-events-none opacity-60"
       style={{
         backgroundImage: `
           radial-gradient(circle at 15% 25%, transparent 25%, rgba(0, 0, 0, 0.08) 25%),
           radial-gradient(circle at 85% 75%, transparent 15%, rgba(0, 0, 0, 0.06) 15%),
           radial-gradient(circle at 45% 60%, transparent 35%, rgba(0, 0, 0, 0.04) 35%),
           linear-gradient(90deg, transparent 98%, rgba(0, 0, 0, 0.15) 98%, rgba(0, 0, 0, 0.15) 100%)
         `
       }}
     />
     
     {/* Vignette for vintage look */}
     <div 
       className="absolute inset-0 pointer-events-none"
       style={{ 
         boxShadow: 'inset 0 0 30px rgba(0,0,0,0.4)' 
       }}
     />
   </div>
          ))}
        </div>


        <div className="mt-3 text-center">
          <p className="font-mono text-[10px] tracking-[2px] text-gray-600">
            {formatDate()}
          </p>
          <p className="font-mono text-[8px] tracking-[3px] text-gray-400 mt-1">
            OBSCURA
          </p>
        </div>
      </div>


      <div 
        className={`
          fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20
          transition-opacity duration-500 delay-[2500ms]
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <button
          onClick={onDownload}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition" />
          <div className="relative px-8 py-3 border border-white/40 group-hover:border-white transition">
            <span className="block text-sm tracking-[0.3em] font-mono text-white/80 group-hover:text-white">
              DOWNLOAD
            </span>
          </div>
        </button>

        <button
          onClick={onRetake}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition" />
          <div className="relative px-8 py-3 border border-white/40 group-hover:border-white transition">
            <span className="block text-sm tracking-[0.3em] font-mono text-white/80 group-hover:text-white">
              RETAKE
            </span>
          </div>
        </button>
      </div>
    </main>
  )
}