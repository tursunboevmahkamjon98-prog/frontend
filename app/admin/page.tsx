"use client"
import { useAdmin } from "@/lib/admin/admin-context"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  const { isAuthenticated } = useAdmin()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
