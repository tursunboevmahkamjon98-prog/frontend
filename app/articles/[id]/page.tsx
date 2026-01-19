import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowLeft, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import mockData from "@/data/mock-data.json"
import { notFound } from "next/navigation"

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = mockData.articles.find((a) => a.id === Number.parseInt(id))

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="py-8 md:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link href="/articles">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime} read
                </div>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">{article.excerpt}</p>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Getting Started</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Step-by-Step Guide</h2>
              <ol className="list-decimal pl-6 space-y-3 text-foreground">
                <li>Prepare your soil by testing pH levels and adding necessary amendments</li>
                <li>Choose the right seeds or seedlings for your climate zone</li>
                <li>Plant at the correct depth and spacing for optimal growth</li>
                <li>Water consistently and monitor soil moisture levels</li>
                <li>Apply organic fertilizers as needed during the growing season</li>
              </ol>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Pro Tips</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Always use high-quality seeds from trusted suppliers</li>
                <li>Mulch around plants to retain moisture and suppress weeds</li>
                <li>Rotate crops annually to prevent soil depletion</li>
                <li>Keep detailed records of planting dates and harvest yields</li>
              </ul>
              <div className="bg-primary/5 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-bold text-foreground mb-2">💡 Quick Tip</h3>
                <p className="text-foreground">
                  The best time to water your plants is early morning, allowing foliage to dry before evening and
                  reducing disease risk.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
