'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import ProductDrawer from './ProductDrawer'
import { deleteProduct } from '@/app/admin/actions'

function formatPrice(n) {
  return `₦${Number(n).toLocaleString('en-NG')}`
}

export default function ProductsClient({ products }) {
  const router = useRouter()
  const [, startTransition] = useTransition()
  const [search, setSearch] = useState('')
  const [drawer, setDrawer] = useState(null) // null | 'new' | product object
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState(null)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  function onSave() {
    setDrawer(null)
    showToast(drawer === 'new' ? 'Product added!' : 'Product updated!')
    startTransition(() => router.refresh())
  }

  async function handleDelete(id, name) {
    setDeleting(true)
    const result = await deleteProduct(id)
    setDeleting(false)
    setConfirmDelete(null)
    if (result?.error) {
      showToast(result.error, 'error')
    } else {
      showToast(`"${name}" deleted`)
      startTransition(() => router.refresh())
    }
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-black">
            Products
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {products.length} {products.length === 1 ? 'product' : 'products'} total
          </p>
        </div>
        <button
          onClick={() => setDrawer('new')}
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] uppercase text-white transition-colors"
          style={{ backgroundColor: '#C4703A' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 md:p-8">
        {/* Search */}
        <div className="mb-6 relative max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-black transition-colors bg-white"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="font-display text-xl font-bold text-gray-300 uppercase tracking-tight mb-2">
              {search ? 'No results' : 'No products yet'}
            </p>
            <p className="text-sm">{search ? 'Try a different search' : 'Click "Add Product" to get started'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => setDrawer(product)}
                onDelete={() => setConfirmDelete(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Drawer */}
      {drawer && (
        <ProductDrawer
          product={drawer === 'new' ? null : drawer}
          onClose={() => setDrawer(null)}
          onSave={onSave}
        />
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-white max-w-sm w-full p-6 shadow-xl">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-2">Delete Product?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This will permanently delete <strong>{confirmDelete.name}</strong>. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2.5 text-sm font-medium border border-gray-200 hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id, confirmDelete.name)}
                disabled={deleting}
                className="px-5 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-[72px] md:bottom-6 right-4 md:right-6 z-50 px-5 py-3.5 text-sm font-medium text-white shadow-lg"
          style={{ backgroundColor: toast.type === 'error' ? '#EF4444' : '#0A0A0A' }}
        >
          {toast.msg}
        </div>
      )}
    </>
  )
}

function ProductCard({ product, onEdit, onDelete }) {
  const mainImage = product.images?.[0]
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null

  return (
    <div className="bg-white border border-gray-100 overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '3/4' }}>
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-black text-white text-[9px] font-bold tracking-wider px-2 py-0.5">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5">
              -{discount}%
            </span>
          )}
        </div>
        {/* Stock indicator */}
        <div className="absolute top-2 right-2">
          <span
            className="w-2.5 h-2.5 rounded-full block"
            style={{ backgroundColor: product.in_stock ? '#22C55E' : '#EF4444' }}
            title={product.in_stock ? 'In stock' : 'Out of stock'}
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex-1 flex flex-col gap-1">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-gray-400">
          {product.category}
        </p>
        <p className="text-sm font-semibold text-black leading-snug line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-bold">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.original_price)}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-gray-100">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold tracking-wider uppercase text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
        <div className="w-px bg-gray-100" />
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-bold tracking-wider uppercase text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}
