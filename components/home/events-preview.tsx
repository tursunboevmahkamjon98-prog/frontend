"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export function EventsPreview() {
  const { t, language } = useLanguage()
  const upcomingEvents = mockData.events.slice(0, 3)

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
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t.events.title}</h2>
            <p className="text-lg text-muted-foreground">{t.events.subtitle}</p>
          </div>
          <Button variant="outline" asChild className="self-start md:self-auto bg-transparent">
            <Link href="/events">
              {t.events.viewAll}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Date Badge */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-center min-w-[60px] p-3 bg-primary rounded-xl text-primary-foreground">
                    <p className="text-2xl font-bold leading-none">{new Date(event.date).getDate()}</p>
                    <p className="text-sm mt-1">
                      {new Date(event.date).toLocaleDateString(getDateLocale(), { month: "short" })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>

                <p className="text-muted-foreground line-clamp-2">{event.description}</p>

                <Link
                  href={`/events`}
                  className="inline-flex items-center gap-1 mt-4 text-primary font-medium hover:gap-2 transition-all"
                >
                  {t.events.learnMore}
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
