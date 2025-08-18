import BlankImage from '@/assets/blank-image.jpg'

export function getFeaturedImage(post, fallback = BlankImage) {
  return post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? fallback
}