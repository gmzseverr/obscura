"use client"
import { useState } from "react"
import Landing from "./components/Landing"
import Camera from "./components/Camera"
import PhotoStrip from "./components/PhotoStrip"
import { downloadPhotoStrip } from "./lib/downloadStrip"
import { AppState, Photo } from "./types"

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing')
  const [photos, setPhotos] = useState<Photo[]>([])

  const handleStart = () => {
    setAppState('camera')
  }

  const handlePhotosComplete = (capturedPhotos: Photo[]) => {
    setPhotos(capturedPhotos)
    setAppState('complete')
  }

  const handleReset = () => {
    setPhotos([])
    setAppState('landing')
  }

  const handleDownload = () => {
    downloadPhotoStrip(photos)
  }

  return (
    <>
      {appState === 'landing' && <Landing onStart={handleStart} />}
      
      {appState === 'camera' && (
        <Camera 
          onComplete={handlePhotosComplete}
          onBack={() => setAppState('landing')}
        />
      )}

      {appState === 'complete' && (
        <PhotoStrip 
          photos={photos}
          onDownload={handleDownload}
          onRetake={handleReset}
        />
      )}
    </>
  )
}