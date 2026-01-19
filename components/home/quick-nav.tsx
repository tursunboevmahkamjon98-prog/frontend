"use client"

import Link from "next/link"
import { Newspaper, BookOpen, ImageIcon, Video, Calendar, Phone } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function QuickNav() {
  const { t } = useLanguage()

  const quickLinks = [
    { href: "/news", label: t.quickNav.latestNews, icon: Newspaper, description: t.quickNav.newsDesc },
    { href: "/articles", label: t.quickNav.tipsArticles, icon: BookOpen, description: t.quickNav.tipsDesc },
    { href: "/gallery", label: t.quickNav.photoGallery, icon: ImageIcon, description: t.quickNav.galleryDesc },
    { href: "/videos", label: t.quickNav.videoTutorials, icon: Video, description: t.quickNav.videosDesc },
    { href: "/events", label: t.quickNav.eventsCalendar, icon: Calendar, description: t.quickNav.eventsDesc },
    { href: "/contact", label: t.quickNav.contactUs, icon: Phone, description: t.quickNav.contactDesc },
  ]

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.quickNav.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.quickNav.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center p-6 bg-background rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:scale-110 flex items-center justify-center mb-4 transition-all duration-300">
                <link.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-semibold text-foreground text-center mb-1">{link.label}</h3>
              <p className="text-xs text-muted-foreground text-center hidden sm:block">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
