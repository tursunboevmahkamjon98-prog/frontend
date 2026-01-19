import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import mockData from "@/data/mock-data.json"
import { notFound } from "next/navigation"

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const news = mockData.news.find((n) => n.id === Number.parseInt(id))

  if (!news) {
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
              <Link href="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <Badge className="mb-4">{news.category}</Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
                {news.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">{news.excerpt}</p>
              <p className="text-foreground leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Key Takeaways</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Important point about the agricultural development</li>
                <li>New techniques and methods being introduced</li>
                <li>Impact on local farming communities</li>
                <li>Future outlook and predictions</li>
              </ul>
              <p className="text-foreground leading-relaxed mt-6">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
