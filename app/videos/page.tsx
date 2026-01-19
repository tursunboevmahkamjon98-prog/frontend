"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, Filter, Video, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const { t } = useLanguage()

  const categories = [
    { key: "All", label: t.categories.all },
    { key: "Gardening", label: t.categories.gardening },
    { key: "Equipment", label: t.categories.equipment },
    { key: "Organic", label: t.categories.organic },
    { key: "Livestock", label: t.categories.livestock },
  ]

  const filteredVideos =
    selectedCategory === "All"
      ? mockData.videos
      : mockData.videos.filter((video) => video.category === selectedCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Video className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t.videos.pageTitle}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.videos.pageSubtitle}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground mr-2">{t.videos.category}</span>
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

        {/* Videos Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => setPlayingVideo(video.videoUrl)}
                      className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-primary-foreground fill-current" />
                      </div>
                    </button>
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
                    <Button
                      variant="outline"
                      className="mt-4 w-full bg-transparent"
                      onClick={() => setPlayingVideo(video.videoUrl)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t.videos.watchVideo}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t.videos.noVideos}</p>
              </div>
            )}
          </div>
        </section>

        {/* Video Modal */}
        {playingVideo && (
          <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 text-background hover:bg-background/20"
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="w-full max-w-4xl aspect-video">
              <iframe
                src={playingVideo}
                title="Video Player"
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
