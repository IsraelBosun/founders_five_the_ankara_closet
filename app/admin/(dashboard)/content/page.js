import { getSiteContent, getTestimonials } from '@/lib/db'
import ContentClient from './_components/ContentClient'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const [content, testimonials] = await Promise.all([
    getSiteContent(),
    getTestimonials(),
  ])
  return <ContentClient content={content} testimonials={testimonials} />
}
