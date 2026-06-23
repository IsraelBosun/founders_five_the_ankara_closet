'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { signOut } from '@/app/admin/actions'

const NAV = [
  {
    href: '/admin/products',
    label: 'Products',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    href: '/admin/content',
    label: 'Content',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      await signOut()
    })
  }

  return (
    <aside
      className="hidden md:flex flex-col flex-shrink-0 h-screen sticky top-0"
      style={{ width: 220, backgroundColor: '#111111' }}
    >
      {/* Brand */}
      <div className="px-5 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="font-display font-bold uppercase leading-none">
          <span className="block text-lg text-white tracking-[0.06em]">THE ANKARA</span>
          <span className="block text-lg tracking-[0.06em]" style={{ color: '#C4703A' }}>CLOSET</span>
        </div>
        <div className="text-[9px] font-bold tracking-[0.3em] uppercase mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
          ADMIN
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        <p
          className="px-5 text-[9px] font-bold tracking-[0.28em] uppercase mb-2"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          MANAGE
        </p>
        {NAV.map(({ href, label, icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-5 py-3 text-sm transition-colors"
              style={{
                color: active ? '#ffffff' : 'rgba(255,255,255,0.55)',
                backgroundColor: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderLeft: active ? '2px solid #C4703A' : '2px solid transparent',
              }}
            >
              {icon}
              <span className="font-medium">{label}</span>
            </Link>
          )
        })}

        {/* View Site */}
        <div className="mx-5 my-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-5 py-3 text-sm transition-opacity hover:opacity-80"
          style={{ color: 'rgba(255,255,255,0.45)', borderLeft: '2px solid transparent' }}
        >
          <ExternalLinkIcon />
          <span className="font-medium">View Site</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="px-5 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={handleSignOut}
          disabled={isPending}
          className="flex items-center gap-3 text-sm w-full transition-opacity hover:opacity-70 disabled:opacity-40"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>{isPending ? 'Signing out...' : 'Sign Out'}</span>
        </button>
      </div>
    </aside>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
