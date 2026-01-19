"use client"

import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export function NewsPreview() {
  const { t, language } = useLanguage()
  const latestNews = mockData.news.slice(0, 3)

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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.news.title}</h2>
            <p className="text-lg text-muted-foreground">{t.news.subtitle}</p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto bg-transparent">
            <Link href="/news">
              {t.news.viewAll}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((news) => (
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
                <p className="text-muted-foreground line-clamp-2">{news.excerpt}</p>
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
      </div>
    </section>
  )
}
