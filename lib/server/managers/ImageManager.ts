import { randomUUID } from "crypto"

declare global {
  var imageManager: {
    images: Map<string, string>
  }
}

function initializeImageManager() {
  if (globalThis.imageManager) return

  globalThis.imageManager = {
    images: new Map<string, string>(),
  }
}

export const getImageById = (id: string): string | undefined => {
  initializeImageManager()
  return globalThis.imageManager.images.get(id)
}

export const saveImage = (image: string): string => {
  const id = randomUUID()
  initializeImageManager()
  globalThis.imageManager.images.set(id, image)
  return id
}

export const hasImage = (id: string): boolean => {
  initializeImageManager()
  return globalThis.imageManager.images.has(id)
}

export const deleteImage = (id: string): void => {
  initializeImageManager()
  globalThis.imageManager.images.delete(id)
}