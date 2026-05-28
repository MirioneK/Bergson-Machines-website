export function getProductGalleryImages(primaryImage, gallery, limit = 2) {
  if (!Array.isArray(gallery)) return []

  const normalizedPrimary = typeof primaryImage === 'string' ? primaryImage.trim() : ''
  const uniqueImages = []

  gallery.forEach((image) => {
    if (typeof image !== 'string') return

    const normalizedImage = image.trim()
    if (!normalizedImage) return
    if (normalizedImage === normalizedPrimary) return
    if (uniqueImages.includes(normalizedImage)) return

    uniqueImages.push(normalizedImage)
  })

  return uniqueImages.slice(0, limit)
}
