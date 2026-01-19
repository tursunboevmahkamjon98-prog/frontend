import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { QuickNav } from "@/components/home/quick-nav"
import { NewsPreview } from "@/components/home/news-preview"
import { EventsPreview } from "@/components/home/events-preview"
import { VideoHighlights } from "@/components/home/video-highlights"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <QuickNav />
        <NewsPreview />
        <EventsPreview />
        <VideoHighlights />
      </main>
      <Footer />
    </div>
  )
}
