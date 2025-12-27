export type AppState = 
  | 'landing'      // start screen
  | 'camera'       // camera preview
  | 'countdown'    // 3, 2, 1...
  | 'capturing'    // taking photo
  | 'complete'     // Strip

export interface Photo {
  id: string
  dataUrl: string
  timestamp: Date
}

export interface CameraState {
  stream: MediaStream | null
  error: string | null
  isActive: boolean
}