"use client"

import Link from "next/link"
import { ArrowRight, Play, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export function VideoHighlights() {
  const { t } = useLanguage()
  const featuredVideos = mockData.videos.slice(0, 3)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.videos.title}</h2>
            <p className="text-lg text-muted-foreground">{t.videos.subtitle}</p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto bg-transparent">
            <Link href="/videos">
              {t.videos.viewAll}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVideos.map((video) => (
            <Card key={video.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary-foreground fill-current" />
                  </div>
                </div>
                <Badge className="absolute top-4 left-4">{video.category}</Badge>
                <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-foreground/80 text-background px-2 py-1 rounded text-sm">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2">{video.description}</p>
                <Link
                  href={`/videos`}
                  className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:gap-2 transition-all"
                >
                  {t.videos.watchNow}
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
