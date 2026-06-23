import AdminSidebar from './_components/AdminSidebar'
import AdminMobileHeader from './_components/AdminMobileHeader'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F5F5' }}>
      <AdminSidebar />
      <AdminMobileHeader />
      {/* pt-[52px] = mobile top bar, pb-[57px] = mobile bottom tab bar */}
      <main className="flex-1 overflow-auto min-w-0 pt-[52px] md:pt-0 pb-[57px] md:pb-0">
        {children}
      </main>
    </div>
  )
}
