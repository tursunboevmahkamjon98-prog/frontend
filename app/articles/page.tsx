"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight, Filter, BookOpen } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { t } = useLanguage()

  const categories = [
    { key: "All", label: t.categories.all },
    { key: "Vegetables", label: t.categories.vegetables },
    { key: "Farming Basics", label: t.categories.farmingBasics },
    { key: "Organic", label: t.categories.organic },
    { key: "Soil Health", label: t.categories.soilHealth },
    { key: "Irrigation", label: t.categories.irrigation },
    { key: "Planning", label: t.categories.planning },
  ]

  const filteredArticles =
    selectedCategory === "All"
      ? mockData.articles
      : mockData.articles.filter((article) => article.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t.articles.pageTitle}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.articles.pageSubtitle}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground mr-2">{t.articles.category}</span>
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

        {/* Articles Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4">{article.category}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      {article.readTime} {t.articles.read}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    <Link
                      href={`/articles/${article.id}`}
                      className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:gap-2 transition-all"
                    >
                      {t.articles.readArticle}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t.articles.noArticles}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
