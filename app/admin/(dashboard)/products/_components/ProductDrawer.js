'use client'

import { useState } from 'react'
import ImageUploader from './ImageUploader'
import { createProduct, updateProduct } from '@/app/admin/actions'

const CATEGORIES = ['Dresses', 'Kimonos & Sets', '2-Pieces', 'Asoke']
const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size (S–XL)']
const input = 'w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-black transition-colors'

function slug(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-gray-400 pb-1 border-b border-gray-100">
        {title}
      </p>
      {children}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-gray-500 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
      style={{ backgroundColor: checked ? '#C4703A' : '#D1D5DB' }}
    >
      <span
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
        style={{ left: checked ? '22px' : '2px' }}
      />
    </button>
  )
}

function TagInput({ value = [], onChange, placeholder }) {
  const [draft, setDraft] = useState('')

  function add() {
    const trimmed = draft.trim()
    if (trimmed && !value.includes(trimmed)) onChange([...value, trimmed])
    setDraft('')
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={placeholder}
          className={`${input} flex-1`}
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-sm font-medium transition-colors"
        >
          Add
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((t) => t !== tag))}
                className="text-gray-400 hover:text-black leading-none"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductDrawer({ product, onClose, onSave }) {
  const isEdit = !!product
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    category: product?.category || 'Dresses',
    badge: product?.badge || '',
    price: product?.price || '',
    original_price: product?.original_price || '',
    is_new: product?.is_new || false,
    featured: product?.featured || false,
    in_stock: product?.in_stock ?? true,
    description: product?.description || '',
    material: product?.material || '',
    fit: product?.fit || '',
    care: product?.care || '',
    length: product?.length || '',
    sizes: product?.sizes || [],
    occasions: product?.occasions || [],
    colorways: product?.colorways || [],
    details: product?.details || [],
    images: product?.images || [],
    rating: product?.rating ?? 5.0,
    review_count: product?.review_count || 0,
    sort_order: product?.sort_order || 0,
  })

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  function toggleSize(size) {
    set('sizes', form.sizes.includes(size)
      ? form.sizes.filter((s) => s !== size)
      : [...form.sizes, size]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const data = {
      ...form,
      price: parseInt(form.price, 10),
      original_price: form.original_price ? parseInt(form.original_price, 10) : null,
      rating: parseFloat(form.rating),
      review_count: parseInt(form.review_count, 10) || 0,
      sort_order: parseInt(form.sort_order, 10) || 0,
    }
    const result = isEdit
      ? await updateProduct(product.id, data)
      : await createProduct(data)
    if (result?.error) {
      setError(result.error)
      setSaving(false)
    } else {
      onSave()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-xl bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 flex-shrink-0">
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">
            {isEdit ? 'Edit Product' : 'New Product'}
          </h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-black transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                {error}
              </div>
            )}

            {/* Basic info */}
            <Section title="Basic Info">
              <Field label="Product Name *">
                <input
                  value={form.name}
                  onChange={(e) => {
                    set('name', e.target.value)
                    if (!isEdit) set('slug', slug(e.target.value))
                  }}
                  className={input}
                  required
                />
              </Field>
              <Field label="URL Slug *">
                <input
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  className={input}
                  required
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                    className={input}
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Badge">
                  <input
                    value={form.badge}
                    onChange={(e) => set('badge', e.target.value)}
                    placeholder="e.g. New Arrival"
                    className={input}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Price (₦) *">
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => set('price', e.target.value)}
                    className={input}
                    required
                    min="0"
                  />
                </Field>
                <Field label="Original Price (₦)">
                  <input
                    type="number"
                    value={form.original_price}
                    onChange={(e) => set('original_price', e.target.value)}
                    placeholder="Leave blank if no sale"
                    className={input}
                    min="0"
                  />
                </Field>
              </div>
            </Section>

            {/* Visibility toggles */}
            <Section title="Visibility">
              <div className="flex flex-col gap-3">
                {[
                  { key: 'in_stock', label: 'In Stock' },
                  { key: 'featured', label: 'Featured on Homepage' },
                  { key: 'is_new', label: 'Mark as New Arrival' },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{label}</span>
                    <Toggle checked={form[key]} onChange={(v) => set(key, v)} />
                  </div>
                ))}
              </div>
            </Section>

            {/* Images */}
            <Section title="Images">
              <ImageUploader images={form.images} onChange={(imgs) => set('images', imgs)} />
            </Section>

            {/* Description */}
            <Section title="Description">
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={4}
                className={`${input} resize-none`}
              />
            </Section>

            {/* Sizes */}
            <Section title="Available Sizes">
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className="px-3 py-2 text-xs font-semibold border transition-colors"
                    style={{
                      backgroundColor: form.sizes.includes(size) ? '#0A0A0A' : '#fff',
                      color: form.sizes.includes(size) ? '#fff' : '#0A0A0A',
                      borderColor: form.sizes.includes(size) ? '#0A0A0A' : '#E5E5E5',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </Section>

            {/* Product specs */}
            <Section title="Product Specs">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'material', label: 'Material' },
                  { key: 'fit', label: 'Fit' },
                  { key: 'care', label: 'Care' },
                  { key: 'length', label: 'Length' },
                ].map(({ key, label }) => (
                  <Field key={key} label={label}>
                    <input value={form[key]} onChange={(e) => set(key, e.target.value)} className={input} />
                  </Field>
                ))}
              </div>
            </Section>

            {/* Feature list */}
            <Section title="Feature Points">
              <TagInput value={form.details} onChange={(v) => set('details', v)} placeholder="Type a feature, press Add" />
            </Section>

            {/* Occasions */}
            <Section title="Occasions">
              <TagInput value={form.occasions} onChange={(v) => set('occasions', v)} placeholder="e.g. Church, Events..." />
            </Section>

            {/* Colorways */}
            <Section title="Colorways (optional)">
              <TagInput value={form.colorways} onChange={(v) => set('colorways', v)} placeholder="e.g. Red & White..." />
            </Section>

            {/* Reviews & sort */}
            <Section title="Reviews & Sort">
              <div className="grid grid-cols-3 gap-3">
                <Field label="Rating">
                  <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => set('rating', e.target.value)} className={input} />
                </Field>
                <Field label="Review Count">
                  <input type="number" min="0" value={form.review_count} onChange={(e) => set('review_count', e.target.value)} className={input} />
                </Field>
                <Field label="Sort Order">
                  <input type="number" min="0" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} className={input} />
                </Field>
              </div>
            </Section>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3 justify-end bg-white flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-7 py-2.5 text-sm font-bold text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: saving ? '#888' : '#0A0A0A' }}
            >
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
