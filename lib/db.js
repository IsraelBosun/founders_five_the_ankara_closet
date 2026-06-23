import { createClient } from './supabase/server'

export { formatPrice, WHATSAPP_NUMBER, getWhatsAppOrderLink, getWhatsAppGeneralLink } from './products'

export async function getProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })
  return data || []
}

export async function getProductBySlug(slug) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  return data || null
}

export async function getFeaturedProducts() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
  return data || []
}

export async function getRelatedProducts(currentSlug, limit = 4) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .neq('slug', currentSlug)
    .limit(limit)
  return data || []
}

export async function getCategories() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  return data || []
}

export async function getTestimonials() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
  return data || []
}

export async function getSiteContent() {
  const supabase = await createClient()
  const { data } = await supabase.from('site_content').select('*')
  return (data || []).reduce((acc, row) => {
    acc[row.key] = row.value
    return acc
  }, {})
}

export async function getSiteContentWithMeta() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_content')
    .select('*')
    .order('section')
  return data || []
}
