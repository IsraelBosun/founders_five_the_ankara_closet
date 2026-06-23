'use client'

import { useState, useRef, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { updateSiteContent, createTestimonial, updateTestimonial, deleteTestimonial } from '@/app/admin/actions'

const inputCls = 'w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors'

/* ─── Shared primitives ─────────────────────────────────────── */

function SectionCard({ title, description, children, onSave, saving }) {
  return (
    <div className="bg-white border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-display text-lg font-bold uppercase tracking-tight">{title}</h2>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-5 space-y-5">
        {children}
      </div>
      {onSave && (
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onSave}
            disabled={saving}
            className="px-6 py-2.5 text-[11px] font-bold tracking-[0.16em] uppercase text-white disabled:opacity-50 transition-colors"
            style={{ backgroundColor: saving ? '#888' : '#C4703A' }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-2">
        {label}
      </label>
      {children}
    </div>
  )
}

function Toast({ msg, type }) {
  if (!msg) return null
  return (
    <div
      className="fixed bottom-[72px] md:bottom-6 right-4 md:right-6 z-50 px-5 py-3.5 text-sm font-medium text-white shadow-lg"
      style={{ backgroundColor: type === 'error' ? '#EF4444' : '#0A0A0A' }}
    >
      {msg}
    </div>
  )
}

/* ─── Image upload field ────────────────────────────────────── */

function ImageField({ label, value, contentKey, onUpdated }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const name = `${Date.now()}.${ext}`
    await supabase.storage.from('site-images').upload(name, file)
    const { data } = supabase.storage.from('site-images').getPublicUrl(name)
    await updateSiteContent(contentKey, data.publicUrl)
    onUpdated(contentKey, data.publicUrl)
    setUploading(false)
    e.target.value = ''
  }

  return (
    <Field label={label}>
      <div className="flex items-start gap-4">
        {value && (
          <div className="w-32 h-20 flex-shrink-0 bg-gray-100 overflow-hidden">
            <img src={value} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            disabled={uploading}
            className="text-sm font-medium text-[#C4703A] hover:underline disabled:opacity-50 text-left"
          >
            {uploading ? 'Uploading...' : value ? 'Replace Image' : 'Upload Image'}
          </button>
          {value && (
            <p className="text-[10px] text-gray-400 break-all max-w-xs">{value}</p>
          )}
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </Field>
  )
}

/* ─── Homepage section ──────────────────────────────────────── */

function HomepageSection({ content, onUpdated }) {
  const [form, setForm] = useState({
    hero_title: content.hero_title || '',
    hero_subtitle: content.hero_subtitle || '',
    reseller_title: content.reseller_title || '',
    reseller_description: content.reseller_description || '',
    announcement_text: content.announcement_text || '',
  })
  const [saving, setSaving] = useState(false)

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })) }

  async function save() {
    setSaving(true)
    for (const [k, v] of Object.entries(form)) {
      await updateSiteContent(k, v)
    }
    Object.entries(form).forEach(([k, v]) => onUpdated(k, v))
    setSaving(false)
  }

  return (
    <SectionCard title="Homepage" description="Hero section, announcement bar, and reseller banner" onSave={save} saving={saving}>
      <Field label="Announcement Bar">
        <input value={form.announcement_text} onChange={(e) => set('announcement_text', e.target.value)} className={inputCls} />
      </Field>
      <Field label="Hero Title">
        <input value={form.hero_title} onChange={(e) => set('hero_title', e.target.value)} className={inputCls} />
      </Field>
      <Field label="Hero Subtitle">
        <textarea value={form.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
      </Field>
      <Field label="Reseller Section Title">
        <input value={form.reseller_title} onChange={(e) => set('reseller_title', e.target.value)} className={inputCls} />
      </Field>
      <Field label="Reseller Description">
        <textarea value={form.reseller_description} onChange={(e) => set('reseller_description', e.target.value)} rows={3} className={`${inputCls} resize-none`} />
      </Field>
    </SectionCard>
  )
}

/* ─── Images section ────────────────────────────────────────── */

function ImagesSection({ content, onUpdated }) {
  return (
    <SectionCard title="Site Images" description="Upload images for key sections of the homepage">
      <ImageField label="Hero Background Image" value={content.hero_image} contentKey="hero_image" onUpdated={onUpdated} />
      <ImageField label="Reseller Section Image" value={content.reseller_image} contentKey="reseller_image" onUpdated={onUpdated} />
    </SectionCard>
  )
}

/* ─── General section ───────────────────────────────────────── */

function GeneralSection({ content, onUpdated }) {
  const [form, setForm] = useState({
    whatsapp_number: content.whatsapp_number || '',
    review_rating: content.review_rating || '',
    review_count_text: content.review_count_text || '',
  })
  const [saving, setSaving] = useState(false)

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })) }

  async function save() {
    setSaving(true)
    for (const [k, v] of Object.entries(form)) {
      await updateSiteContent(k, v)
    }
    Object.entries(form).forEach(([k, v]) => onUpdated(k, v))
    setSaving(false)
  }

  return (
    <SectionCard title="General Settings" description="Store-wide settings and contact info" onSave={save} saving={saving}>
      <Field label="WhatsApp Number (digits only, with country code)">
        <input value={form.whatsapp_number} onChange={(e) => set('whatsapp_number', e.target.value)} placeholder="2348133053455" className={inputCls} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Review Rating Display">
          <input value={form.review_rating} onChange={(e) => set('review_rating', e.target.value)} placeholder="4.9" className={inputCls} />
        </Field>
        <Field label="Review Count Text">
          <input value={form.review_count_text} onChange={(e) => set('review_count_text', e.target.value)} placeholder="Loved by 500+ customers" className={inputCls} />
        </Field>
      </div>
    </SectionCard>
  )
}

/* ─── Testimonials section ──────────────────────────────────── */

function TestimonialsSection({ testimonials: initial }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [items, setItems] = useState(initial)
  const [editing, setEditing] = useState(null) // null | 'new' | item
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)

  function openNew() {
    setForm({ text: '', name: '', location: '', stars: 5, time_ago: '', size: '', sort_order: items.length + 1 })
    setEditing('new')
  }

  function openEdit(item) {
    setForm({ ...item })
    setEditing(item)
  }

  function setF(k, v) { setForm((f) => ({ ...f, [k]: v })) }

  async function save() {
    setSaving(true)
    const data = { ...form, stars: parseInt(form.stars), sort_order: parseInt(form.sort_order) || 0 }
    let result
    if (editing === 'new') {
      result = await createTestimonial(data)
    } else {
      result = await updateTestimonial(editing.id, data)
    }
    if (!result?.error) {
      setEditing(null)
      startTransition(() => router.refresh())
    }
    setSaving(false)
  }

  async function handleDelete(id) {
    setDeleting(id)
    await deleteTestimonial(id)
    setDeleting(null)
    startTransition(() => router.refresh())
  }

  return (
    <SectionCard title="Testimonials" description="Customer reviews shown on the homepage">
      <div className="flex justify-end mb-1">
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-[0.16em] uppercase border border-gray-200 hover:border-black transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Review
        </button>
      </div>

      {/* Inline form */}
      {editing && (
        <div className="border border-gray-200 p-4 space-y-3 bg-gray-50">
          <p className="text-[10px] font-bold tracking-wider uppercase text-gray-500">
            {editing === 'new' ? 'New Review' : 'Edit Review'}
          </p>
          <textarea
            value={form.text}
            onChange={(e) => setF('text', e.target.value)}
            placeholder="Review text..."
            rows={3}
            className={`${inputCls} resize-none`}
          />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.name} onChange={(e) => setF('name', e.target.value)} placeholder="Customer name" className={inputCls} />
            <input value={form.location} onChange={(e) => setF('location', e.target.value)} placeholder="City" className={inputCls} />
            <input value={form.size} onChange={(e) => setF('size', e.target.value)} placeholder="Size bought" className={inputCls} />
            <input value={form.time_ago} onChange={(e) => setF('time_ago', e.target.value)} placeholder="e.g. 2 weeks ago" className={inputCls} />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm border border-gray-200 hover:border-gray-400">Cancel</button>
            <button
              onClick={save}
              disabled={saving}
              className="px-5 py-2 text-sm font-bold text-white disabled:opacity-50"
              style={{ backgroundColor: '#C4703A' }}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {items.length === 0 && !editing && (
          <p className="text-sm text-gray-400 py-4 text-center">No testimonials yet.</p>
        )}
        {items.map((t) => (
          <div key={t.id} className="flex items-start gap-3 p-3 border border-gray-100 bg-white">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">&ldquo;{t.text}&rdquo;</p>
              <p className="text-[10px] text-gray-400 mt-1 font-medium">
                {t.name} &middot; {t.location} &middot; {t.size}
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button
                onClick={() => openEdit(t)}
                className="p-1.5 text-gray-400 hover:text-black transition-colors"
                title="Edit"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                disabled={deleting === t.id}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
                title="Delete"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

/* ─── Main export ───────────────────────────────────────────── */

export default function ContentClient({ content: initialContent, testimonials }) {
  const [content, setContent] = useState(initialContent)
  const [toast, setToast] = useState(null)

  function onUpdated(key, value) {
    setContent((c) => ({ ...c, [key]: value }))
    setToast({ msg: 'Saved!', type: 'success' })
    setTimeout(() => setToast(null), 2500)
  }

  return (
    <>
      {/* Page header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-5">
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">Content</h1>
        <p className="text-xs text-gray-400 mt-0.5">Manage text, images, and reviews shown on the website</p>
      </div>

      <div className="p-4 md:p-8 space-y-6 max-w-3xl">
        <HomepageSection content={content} onUpdated={onUpdated} />
        <ImagesSection content={content} onUpdated={onUpdated} />
        <GeneralSection content={content} onUpdated={onUpdated} />
        <TestimonialsSection testimonials={testimonials} />
      </div>

      <Toast msg={toast?.msg} type={toast?.type} />
    </>
  )
}
