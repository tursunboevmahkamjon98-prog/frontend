import type React from "react"
import { AdminProvider } from "@/lib/admin/admin-context"
import { LanguageProvider } from "@/lib/i18n/language-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <AdminProvider>{children}</AdminProvider>
    </LanguageProvider>
  )
}
