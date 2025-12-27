"use client"

import { useEffect, useState } from 'react'

import Countdown from './Countdown'
import Flash from './Flash'
import type { Photo } from '../types'
import { usePhotoCapture } from '../hooks/usePhotoCapture'
import { useCamera } from '../hooks/useCamera'

interface CameraProps {
  onComplete: (photos: Photo[]) => void
  onBack: () => void
}

export default function Camera({ onComplete, onBack }: CameraProps) {
  const { videoRef, cameraState, startCamera, stopCamera } = useCamera()
  const { isCapturing, startCapture } = usePhotoCapture(videoRef)
  
  const [countdown, setCountdown] = useState(0)
  const [showFlash, setShowFlash] = useState(false)

  const [currentTime, setCurrentTime] = useState<Date | null>(null) // null ile başla
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    startCamera()
    
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  
    return () => {
      stopCamera()
      clearInterval(interval)
    }
  }, [])
  
  const formatTime = () => {
    if (!currentTime) return "--:--:--"
    
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const handleCapture = () => {
    startCapture(
      (count) => setCountdown(count),
      () => {
        setShowFlash(true)
        setTimeout(() => setShowFlash(false), 300)
      },
      (photos) => {
        stopCamera()
        onComplete(photos)
      }
    )
  }

 

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
      {/* Analog Effects */}
      <div className="analog-overlay" />
      <div className="vignette" />
      <div className="scanlines" />

      {/* Flash Effect */}
      {showFlash && <Flash />}

      <div className="relative z-10 w-full max-w-lg px-6">
        {/* System Bar */}
        <div className="w-full border-b border-white/10 pb-2 mb-8 flex justify-between font-mono text-[10px] text-gray-500">
          <span>CAPTURE_MODE</span>
          <span>4-FRAME SEQUENCE</span>
        </div>

        {/* Camera Viewfinder */}
        <div className="relative w-full aspect-[3/4] bg-black border-4 border-white/20 overflow-hidden">
          {cameraState.error ? (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center">
                <p className="text-red-400 font-mono text-sm mb-4">
                  {cameraState.error}
                </p>
                <button 
                  onClick={startCamera} 
                  className="px-6 py-3 border border-white/40 text-white/80 hover:bg-white/10 transition font-mono text-xs tracking-wider"
                >
                  TRY AGAIN
                </button>
              </div>
            </div>
          ) : (
            <>
        
        <video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  className="w-full h-full object-cover"
  style={{ 
    filter: 'saturate(0) contrast(3) brightness(1.15) grayscale(1)',
  }}
/>

              {/* Viewfinder Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner Brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/60" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/60" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/60" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/60" />

                {/* Center Crosshair */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/30" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30" />
                    <div className="absolute inset-0 border border-white/20 rounded-full" />
                  </div>
                </div>

                {/* Top Info Bar */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-3">
                  <div className="flex justify-between items-start font-mono text-[10px] text-white/80">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span>REC</span>
                      </div>
                      <div className="text-white/60 text-[9px]">
                        B&W FILM MODE
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-1">{formatTime()}</div>
                      <div className="text-white/60 text-[9px]">
                        ISO 400
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="font-mono text-[9px] text-white/60 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <span>●</span>
                      <span>FOCUS: AUTO</span>
                      <span>●</span>
                      <span>EXPOSURE: +0.7</span>
                      <span>●</span>
                    </div>
                  </div>
                </div>

                {/* Grid Lines (Rule of Thirds) */}
                <div className="absolute inset-0">
                  {/* Vertical lines */}
                  <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/10" />
                  <div className="absolute right-1/3 top-0 bottom-0 w-[1px] bg-white/10" />
                  {/* Horizontal lines */}
                  <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/10" />
                  <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-white/10" />
                </div>
              </div>

              {/* Countdown Overlay */}
              {countdown > 0 && <Countdown count={countdown} />}
            </>
          )}

          {/* Heavy Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)' }} 
          />
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={onBack}
            disabled={isCapturing}
            className="font-mono text-xs text-gray-500 hover:text-white transition tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← BACK
          </button>

          <button
            onClick={handleCapture}
            disabled={isCapturing || !!cameraState.error}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition" />
            <div className="relative px-10 py-3 border border-white/40 group-hover:border-white transition disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="block text-sm tracking-[0.3em] font-mono text-white/80 group-hover:text-white">
                {isCapturing ? 'CAPTURING...' : 'CAPTURE'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </main>
  )
}