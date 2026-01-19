"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { t, language } = useLanguage()

  const categories = [
    { key: "All", label: t.categories.all },
    { key: "Research", label: t.categories.research },
    { key: "Policy", label: t.categories.policy },
    { key: "Events", label: t.categories.events },
    { key: "Agriculture", label: t.categories.agriculture },
    { key: "Technology", label: t.categories.technology },
    { key: "Livestock", label: t.categories.livestock },
  ]

  const filteredNews =
    selectedCategory === "All" ? mockData.news : mockData.news.filter((news) => news.category === selectedCategory)

  const getDateLocale = () => {
    switch (language) {
      case "ru":
        return "ru-RU"
      case "uz":
        return "uz-UZ"
      default:
        return "en-US"
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.news.pageTitle}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.news.pageSubtitle}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground mr-2">{t.news.filterBy}</span>
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                  className="rounded-full"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <Card key={news.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <img
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{news.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(news.date).toLocaleDateString(getDateLocale(), {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">{news.excerpt}</p>
                    <Link
                      href={`/news/${news.id}`}
                      className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:gap-2 transition-all"
                    >
                      {t.news.readMore}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t.news.noNews}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
