"use client"
import { useEffect, useState } from "react"

export default function Landing({ onStart }: { onStart: () => void }) {
  const [now, setNow] = useState<Date | null>(null) // null ile başla
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // İlk mount'ta zamanı set et
    setMounted(true)
    setNow(new Date())
    
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const date = now
    ? now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).toUpperCase()
    : "--- --, ----"

  const time = now
    ? now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "--:--:-- --"

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden">
      <div className="analog-overlay" />
      <div className="vignette" />
      <div className="scanlines" />

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center">
        <div className="w-full border-b border-white/10 pb-2 mb-12 flex justify-between font-mono text-[10px] text-gray-500">
          <span>STBY_MOD_90</span>
          <span>OBSCURA_SYSTEMS_V.01</span>
        </div>

        <div className="text-center">
          <h1 className="text-6xl md:text-7xl tracking-[-0.05em] font-medium text-[#e6e6e6]">
            OBSCURA
          </h1>
          <p className="mt-2 text-[9px] uppercase tracking-[0.45em] text-gray-500">
            ANALOG PHOTO BOOTH
          </p>
        </div>

        <button 
          onClick={onStart}
          className="mt-24 group relative"
        >
          <div className="absolute -inset-1 bg-white/10 blur-sm opacity-0 group-hover:opacity-100 transition" />
          <div className="relative px-12 py-4 border border-white/40 group-hover:border-white transition">
            <span className="block text-sm tracking-[0.3em] font-mono text-white/80 group-hover:text-white">
              BEGIN SESSION
            </span>
            <span className="block text-[9px] mt-1 text-gray-500">
              CLICK TO CONTINUE
            </span>
          </div>
        </button>

        <div className="mt-32 text-center">
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            Camera access required for capture
          </p>
        </div>
      </div>

      {/* Timestamp - Hydration safe */}
      <div className="absolute bottom-8 right-10 font-mono text-xs text-white/70 leading-tight">
        <div className="px-3 py-2 border border-white/20 bg-black/40 backdrop-blur-sm">
          <p className="text-white/50 text-[9px] mb-1 tracking-wider">
            SYSTEM TIME
          </p>
          {mounted ? (
            <>
              <p className="text-[13px] tracking-wide">{time}</p>
              <p className="text-[11px] text-white/50 mt-0.5">{date}</p>
            </>
          ) : (
            <>
              <p className="text-[13px] tracking-wide opacity-0">--:--:-- --</p>
              <p className="text-[11px] text-white/50 mt-0.5 opacity-0">--- --, ----</p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}