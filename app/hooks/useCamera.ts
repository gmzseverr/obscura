"use client"

import { useState, useEffect, useRef } from 'react'
import { CameraState } from '../types'


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
          height: { ideal: 1920 },
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
      setCameraState({
        stream: null,
        error: 'Camera access denied. Please allow camera permission.',
        isActive: false,
      })
    }
  }

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return {
    videoRef,
    cameraState,
    startCamera,
    stopCamera,
  }
}