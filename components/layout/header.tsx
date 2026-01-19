"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Wheat, Home, Newspaper, BookOpen, ImageIcon, Video, Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/news", label: t.nav.news, icon: Newspaper },
    { href: "/articles", label: t.nav.articles, icon: BookOpen },
    { href: "/gallery", label: t.nav.gallery, icon: ImageIcon },
    { href: "/videos", label: t.nav.videos, icon: Video },
    { href: "/events", label: t.nav.events, icon: Calendar },
    { href: "/contact", label: t.nav.contact, icon: Phone },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Wheat className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              KISHO<span className="text-primary">VARZ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium text-lg"
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
