'use client'

import { useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ImageUploader({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  async function handleFiles(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    const supabase = createClient()
    const urls = []
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('product-images').upload(name, file)
      if (!error) {
        const { data } = supabase.storage.from('product-images').getPublicUrl(name)
        urls.push(data.publicUrl)
      }
    }
    onChange([...images, ...urls])
    setUploading(false)
    e.target.value = ''
  }

  function remove(url) {
    onChange(images.filter((u) => u !== url))
  }

  function move(from, to) {
    const next = [...images]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((url, i) => (
            <div key={url} className="relative group w-20 h-20 flex-shrink-0">
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover border border-gray-200"
              />
              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(url)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold leading-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                ×
              </button>
              {/* Main badge */}
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] text-center py-0.5 font-bold tracking-wider">
                  MAIN
                </span>
              )}
              {/* Reorder arrows */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() => move(i, i - 1)}
                      className="w-6 h-6 bg-white/90 text-black text-xs flex items-center justify-center hover:bg-white"
                    >
                      ‹
                    </button>
                  )}
                  {i < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => move(i, i + 1)}
                      className="w-6 h-6 bg-white/90 text-black text-xs flex items-center justify-center hover:bg-white"
                    >
                      ›
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current.click()}
        disabled={uploading}
        className="w-full border-2 border-dashed border-gray-200 hover:border-gray-400 py-5 text-sm text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        {uploading ? 'Uploading...' : 'Upload Images'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFiles}
      />
      <p className="text-[10px] text-gray-400">First image is shown as the main photo. Drag arrows to reorder.</p>
    </div>
  )
}
