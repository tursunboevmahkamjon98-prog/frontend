"use client"

import Link from "next/link"
import { ArrowRight, Sprout, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-primary rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-primary rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm">
              <Sprout className="w-4 h-4" />
              {t.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              {t.hero.title} <span className="text-primary">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/articles">
                  {t.hero.exploreTips}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                <Link href="/events">{t.hero.viewEvents}</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/farmer-in-green-field-sunset.jpg"
                alt="Farmer in a green field at sunset"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-lg p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">{t.hero.activeFarmers}</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-card rounded-2xl shadow-lg p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">{t.hero.farmingGuides}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
