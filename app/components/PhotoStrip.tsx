"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Photo } from '../types'

interface PhotoStripProps {
  photos: Photo[]
  onDownload: () => void
  onRetake: () => void
}

export default function PhotoStrip({ photos, onDownload, onRetake }: PhotoStripProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      stripRef.current,
      {
        y: -600,
        rotation: 0,
        opacity: 0,
      },
      {
        y: 0,
        rotation: -1.5,
        opacity: 1,
        duration: 1.8,
        ease: 'elastic.out(1, 0.6)',
      }
    )

    tl.fromTo(
      buttonsRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.5'
    )
  }, [])

  const formatDate = () => {
    const now = new Date()
    const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const day = String(now.getDate()).padStart(2, '0')
    const year = now.getFullYear()
    return `${month} ${day}, ${year}`
  }

  return (
    <main className="relative h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
      {/* Analog Effects */}
      <div className="analog-overlay" />
      <div className="vignette" />
      <div className="scanlines" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-3">
        {/* Photo Strip - ULTRA COMPACT */}
        <div 
          ref={stripRef}
          className="bg-[#f5f5f0] shadow-2xl opacity-0 flex-shrink-0"
          style={{
            width: 'clamp(120px, 15vw, 140px)', // Responsive width
            padding: '8px 6px',
          }}
        >
          {/* Paper texture */}
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

          {/* Photos - Minimal spacing */}
          <div className="relative space-y-1.5">
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
                
                {/* Film Grain */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-35"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                  }}
                />
                
                {/* Dust */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-50"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 15% 25%, transparent 25%, rgba(0, 0, 0, 0.08) 25%),
                      radial-gradient(circle at 85% 75%, transparent 15%, rgba(0, 0, 0, 0.06) 15%)
                    `
                  }}
                />
                
                {/* Vignette */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{ 
                    boxShadow: 'inset 0 0 18px rgba(0,0,0,0.35)' 
                  }}
                />
              </div>
            ))}
          </div>

          {/* Footer - Minimal */}
          <div className="mt-1 text-center">
            <p className="font-mono text-[7px] tracking-[1px] text-gray-600">
              {formatDate()}
            </p>
            <p className="font-mono text-[6px] tracking-[1.5px] text-gray-400 mt-0.5">
              OBSCURA
            </p>
          </div>
        </div>

        {/* Buttons - Compact */}
        <div 
          ref={buttonsRef}
          className="flex gap-2.5 z-20 opacity-0 flex-shrink-0"
        >
          <button
            onClick={onDownload}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition" />
            <div className="relative px-4 py-1.5 border border-white/40 group-hover:border-white transition">
              <span className="block text-[10px] tracking-[0.2em] font-mono text-white/80 group-hover:text-white">
                DOWNLOAD
              </span>
            </div>
          </button>

          <button
            onClick={onRetake}
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition" />
            <div className="relative px-4 py-1.5 border border-white/40 group-hover:border-white transition">
              <span className="block text-[10px] tracking-[0.2em] font-mono text-white/80 group-hover:text-white">
                RETAKE
              </span>
            </div>
          </button>
        </div>
      </div>
    </main>
  )
}