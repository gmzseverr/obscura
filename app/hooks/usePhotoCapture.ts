"use client"

import { useState, useRef } from 'react'
import type { Photo } from '../types'

export function usePhotoCapture(videoRef: React.RefObject<HTMLVideoElement | null>) {
    const [photos, setPhotos] = useState<Photo[]>([])
    const [isCapturing, setIsCapturing] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const capturePhoto = (): Photo | null => {
    if (!videoRef.current) return null

    // Create canvas if doesn't exist
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas')
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9)

    const photo: Photo = {
      id: `photo-${Date.now()}-${Math.random()}`,
      dataUrl,
      timestamp: new Date(),
    }

    return photo
  }

  const startCapture = async (
    onCountdown: (count: number) => void,
    onFlash: () => void,
    onComplete: (photos: Photo[]) => void
  ) => {
    setIsCapturing(true)
    const capturedPhotos: Photo[] = []

    // Capture 4 photos
    for (let i = 0; i < 4; i++) {
      // Countdown
      for (let count = 3; count > 0; count--) {
        onCountdown(count)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Hide countdown
      onCountdown(0)

      // Flash and capture
      onFlash()
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const photo = capturePhoto()
      if (photo) {
        capturedPhotos.push(photo)
        setPhotos(prev => [...prev, photo])
      }

      // Wait before next photo (except last one)
      if (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
    }

    setIsCapturing(false)
    onComplete(capturedPhotos)
  }

  return {
    photos,
    isCapturing,
    startCapture,
  }
}