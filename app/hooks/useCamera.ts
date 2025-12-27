"use client"

import { useState, useEffect, useRef } from 'react'
import type { CameraState } from '../types'

export function useCamera() {
  const [cameraState, setCameraState] = useState<CameraState>({
    stream: null,
    error: null,
    isActive: false,
  })
  
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 1280 },
          facingMode: 'user',
        },
      })

      setCameraState({
        stream,
        error: null,
        isActive: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error('Camera error:', err) // Debug için
      setCameraState({
        stream: null,
        error: 'Camera access denied. Please allow camera permission.',
        isActive: false,
      })
    }
  }
//stop camera
  const stopCamera = () => {
    if (cameraState.stream) {
      cameraState.stream.getTracks().forEach(track => track.stop())
      setCameraState({
        stream: null,
        error: null,
        isActive: false,
      })
    }
  }

  useEffect(() => {
    return () => {
      if (cameraState.stream) {
        cameraState.stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [cameraState.stream])

  return {
    videoRef,
    cameraState,
    startCamera,
    stopCamera,
  }
}