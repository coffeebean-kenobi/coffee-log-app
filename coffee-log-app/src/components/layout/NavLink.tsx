'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  href: string
  icon?: string
  children: ReactNode
  className?: string
}

export default function NavLink({ href, icon, children, className = '' }: Props) {
  const pathname = usePathname()
  const styles = useThemeStyles()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: styles.spacing('sm'),
        padding: `${styles.spacing('sm')} ${styles.spacing('md')}`,
        borderRadius: styles.borderRadius('md'),
        fontSize: styles.typography('fontSize.sm'),
        fontWeight: styles.typography('fontWeight.medium'),
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        backgroundColor: isActive ? styles.color('primary.main') : 'transparent',
        color: isActive ? styles.color('background.paper') : styles.color('text.secondary')
      }}
      className={className}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = styles.color('text.primary')
          e.currentTarget.style.backgroundColor = styles.color('accent.light')
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = styles.color('text.secondary')
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      {icon && <span style={{ fontSize: '1rem' }}>{icon}</span>}
      {children}
    </Link>
  )
} 