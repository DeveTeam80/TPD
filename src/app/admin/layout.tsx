// app/admin/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | The People\'s Directory',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* You can add a shared Admin Navbar or Sidebar here if needed */}
      {children}
    </div>
  )
}