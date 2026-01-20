'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon?: string
}

interface SidebarProps {
  className?: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Onboarding', href: '/welcome' },
  { label: 'Products', href: '/products/select' },
  { label: 'Production', href: '/production/input' },
]

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname()
  
  return (
    <aside className={cn(
      'w-64 bg-white border-r border-gray-200 min-h-screen p-6',
      className
    )}>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-700">Artisan Market</h2>
        <p className="text-sm text-gray-500">Platform</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-slate-700 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {item.icon && <span className="mr-3">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
