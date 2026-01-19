"use client"

import Link from "next/link"
import { Wheat, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useLanguage()

  const quickLinks = [
    { label: t.nav.news, href: "/news" },
    { label: t.nav.articles, href: "/articles" },
    { label: t.nav.gallery, href: "/gallery" },
    { label: t.nav.videos, href: "/videos" },
    { label: t.nav.events, href: "/events" },
  ]

  const resources = [
    t.footer.farmingGuides,
    t.footer.weatherUpdates,
    t.footer.marketPrices,
    t.footer.equipment,
    t.footer.community,
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center">
                <Wheat className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight">KISHOVARZ</span>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">{t.footer.description}</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.resources}</h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 shrink-0" />
                <span className="text-primary-foreground/80">{t.contact.addressValue}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span className="text-primary-foreground/80">+992 (37) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span className="text-primary-foreground/80">info@kishovarz.tj</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} KISHOVARZ. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
