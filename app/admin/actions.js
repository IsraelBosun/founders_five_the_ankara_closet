'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signIn(_, formData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (error) return { error: error.message }
  redirect('/admin/products')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

function revalidateAll(slug) {
  revalidatePath('/', 'layout')
  revalidatePath('/shop')
  if (slug) revalidatePath(`/shop/${slug}`)
}

export async function createProduct(data) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').insert([{
    ...data,
    updated_at: new Date().toISOString(),
  }])
  if (error) return { error: error.message }
  revalidateAll(data.slug)
  return { success: true }
}

export async function updateProduct(id, data) {
  const supabase = await createClient()
  const { error } = await supabase.from('products')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidateAll(data.slug)
  return { success: true }
}

export async function deleteProduct(id) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidateAll()
  return { success: true }
}

export async function createTestimonial(data) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').insert([data])
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

export async function updateTestimonial(id, data) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').update(data).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

export async function deleteTestimonial(id) {
  const supabase = await createClient()
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

export async function updateSiteContent(key, value) {
  const supabase = await createClient()
  const { error } = await supabase.from('site_content')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  return { success: true }
}
