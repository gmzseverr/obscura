"use client"

export default function Flash() {
  return (
    <div 
      className="fixed inset-0 bg-white z-[9999] pointer-events-none"
      style={{
        animation: 'flash 0.3s ease-out forwards'
      }}
    />
  )
}