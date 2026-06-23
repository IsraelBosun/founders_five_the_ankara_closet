'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { signOut } from '@/app/admin/actions'

const TABS = [
  {
    href: '/admin/products',
    label: 'Products',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    href: '/admin/content',
    label: 'Content',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
]

export default function AdminMobileHeader() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      await signOut()
    })
  }

  return (
    <>
      {/* Top bar — mobile only */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4"
        style={{ height: 52, backgroundColor: '#111111', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Brand */}
        <div className="font-display font-bold uppercase leading-none">
          <span className="text-white text-[15px] tracking-[0.05em]">THE ANKARA </span>
          <span className="text-[15px] tracking-[0.05em]" style={{ color: '#C4703A' }}>CLOSET</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] uppercase py-1.5 px-3 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Site
          </Link>
          <button
            onClick={handleSignOut}
            disabled={isPending}
            className="transition-opacity hover:opacity-70 disabled:opacity-40"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            title="Sign out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom tab bar — mobile only */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex"
        style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        {TABS.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-opacity"
              style={{ color: active ? '#C4703A' : 'rgba(255,255,255,0.4)' }}
            >
              {icon}
              <span className="text-[10px] font-bold tracking-[0.12em] uppercase">{label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
