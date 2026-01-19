"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState({ albumIndex: 0, imageIndex: 0 })
  const { t } = useLanguage()

  const openLightbox = (albumIndex: number, imageIndex: number) => {
    setCurrentImage({ albumIndex, imageIndex })
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const navigateImage = (direction: "prev" | "next") => {
    const album = mockData.gallery[currentImage.albumIndex]
    let newIndex = currentImage.imageIndex + (direction === "next" ? 1 : -1)

    if (newIndex < 0) newIndex = album.images.length - 1
    if (newIndex >= album.images.length) newIndex = 0

    setCurrentImage({ ...currentImage, imageIndex: newIndex })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t.gallery.pageTitle}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.gallery.pageSubtitle}</p>
          </div>
        </section>

        {/* Gallery Albums */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-12">
              {mockData.gallery.map((album, albumIndex) => (
                <Card key={album.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl">{album.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {album.images.map((image, imageIndex) => (
                        <button
                          key={imageIndex}
                          onClick={() => openLightbox(albumIndex, imageIndex)}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${album.title} - Photo ${imageIndex + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-card/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ImageIcon className="w-6 h-6 text-foreground" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-background hover:bg-background/20"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateImage("prev")}
              className="absolute left-4 text-background hover:bg-background/20"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <img
              src={mockData.gallery[currentImage.albumIndex].images[currentImage.imageIndex] || "/placeholder.svg"}
              alt="Gallery image"
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateImage("next")}
              className="absolute right-4 text-background hover:bg-background/20"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="absolute bottom-4 text-background text-center">
              <p className="font-medium">{mockData.gallery[currentImage.albumIndex].title}</p>
              <p className="text-sm opacity-70">
                {currentImage.imageIndex + 1} / {mockData.gallery[currentImage.albumIndex].images.length}
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
