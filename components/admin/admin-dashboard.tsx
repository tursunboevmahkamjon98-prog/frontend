"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Wheat,
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Calendar,
  Video,
  ImageIcon,
  Settings,
  LogOut,
  ArrowLeft,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAdmin } from "@/lib/admin/admin-context"
import { useLanguage } from "@/lib/i18n/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { AdminNewsManager } from "./admin-news-manager"
import { AdminArticlesManager } from "./admin-articles-manager"
import { AdminEventsManager } from "./admin-events-manager"
import { AdminVideosManager } from "./admin-videos-manager"

type Section = "dashboard" | "news" | "articles" | "events" | "videos" | "gallery" | "settings"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard")
  const { logout } = useAdmin()
  const { t } = useLanguage()

  const menuItems = [
    { id: "dashboard" as Section, label: t.admin.dashboard, icon: LayoutDashboard },
    { id: "news" as Section, label: t.admin.manageNews, icon: Newspaper },
    { id: "articles" as Section, label: t.admin.manageArticles, icon: BookOpen },
    { id: "events" as Section, label: t.admin.manageEvents, icon: Calendar },
    { id: "videos" as Section, label: t.admin.manageVideos, icon: Video },
    { id: "gallery" as Section, label: t.admin.manageGallery, icon: ImageIcon },
    { id: "settings" as Section, label: t.admin.settings, icon: Settings },
  ]

  const stats = [
    { label: t.admin.totalNews, value: 12, icon: Newspaper, color: "bg-blue-500" },
    { label: t.admin.totalArticles, value: 24, icon: BookOpen, color: "bg-green-500" },
    { label: t.admin.totalEvents, value: 8, icon: Calendar, color: "bg-purple-500" },
    { label: t.admin.totalVideos, value: 15, icon: Video, color: "bg-orange-500" },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12% this month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{t.admin.recentActivity}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Added new article", item: "Organic Farming Tips", time: "2 hours ago" },
                    { action: "Updated event", item: "Spring Farming Workshop", time: "5 hours ago" },
                    { action: "Published news", item: "New Agricultural Policy", time: "1 day ago" },
                    { action: "Added video", item: "Irrigation Techniques", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "news":
        return <AdminNewsManager />
      case "articles":
        return <AdminArticlesManager />
      case "events":
        return <AdminEventsManager />
      case "videos":
        return <AdminVideosManager />
      case "gallery":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t.admin.manageGallery}</CardTitle>
              <CardDescription>Upload and manage gallery photos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Gallery management coming soon...</p>
            </CardContent>
          </Card>
        )
      case "settings":
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t.admin.settings}</CardTitle>
              <CardDescription>Configure site settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4 hidden lg:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Wheat className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">KISHOVARZ</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              {t.admin.backToSite}
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            {t.admin.logout}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:hidden">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Wheat className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold">KISHOVARZ</span>
            </div>
            <h1 className="text-xl font-semibold hidden lg:block">{t.admin.title}</h1>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="ghost" onClick={logout} className="lg:hidden" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex gap-2 mt-4 overflow-x-auto pb-2 lg:hidden">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  activeSection === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6">{renderContent()}</div>
      </main>
    </div>
  )
}
