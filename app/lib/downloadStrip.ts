import type { Photo } from '../types'

export function downloadPhotoStrip(photos: Photo[]) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return

  const photoWidth = 800
  const photoHeight = 1066
  const padding = 60
  const footerHeight = 100
  
  canvas.width = photoWidth + (padding * 2)
  canvas.height = (photoHeight * 4) + (padding * 5) + footerHeight
  
  // Background (paper color)
  ctx.fillStyle = '#f5f5f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // Draw photos
  const imagePromises = photos.map((photo, index) => {
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => {
        const y = padding + (index * (photoHeight + padding))
        
        // Draw photo
        ctx.drawImage(img, padding, y, photoWidth, photoHeight)
        
        resolve()
      }
      img.src = photo.dataUrl
    })
  })

  Promise.all(imagePromises).then(() => {
    // Footer text
    ctx.fillStyle = '#666666'
    ctx.font = '24px "Courier New", monospace'
    ctx.textAlign = 'center'
    
    const now = new Date()
    const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const day = String(now.getDate()).padStart(2, '0')
    const year = now.getFullYear()
    const dateText = `${month} ${day}, ${year}`
    
    const footerY = canvas.height - footerHeight / 2 + 10
    ctx.fillText(dateText, canvas.width / 2, footerY)
    
    ctx.font = '18px "Courier New", monospace'
    ctx.fillStyle = '#999999'
    ctx.fillText('OBSCURA', canvas.width / 2, footerY + 30)
    
    // Download
    const link = document.createElement('a')
    link.download = `obscura-${Date.now()}.jpg`
    link.href = canvas.toDataURL('image/jpeg', 0.95)
    link.click()
  })
}