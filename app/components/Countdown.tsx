"use client"

interface CountdownProps {
  count: number
}

export default function Countdown({ count }: CountdownProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 animate-pulse">
      <span className="text-[150px] font-bold text-white/90 font-mono">
        {count}
      </span>
    </div>
  )
}