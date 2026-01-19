"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import mockData from "@/data/mock-data.json"

export default function EventsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)) // February 2026
  const { t, language } = useLanguage()

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1))
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockData.events.filter((event) => event.date === dateStr)
  }

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

  const getMonthName = () => {
    return t.calendar.months[currentMonth.getMonth()] + " " + currentMonth.getFullYear()
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
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t.events.pageTitle}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.events.pageSubtitle}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-6">
                      <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")}>
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <h2 className="text-xl font-bold text-foreground">{getMonthName()}</h2>
                      <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")}>
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Day Labels */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {t.calendar.days.map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2">
                      {emptyDays.map((i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                      ))}
                      {days.map((day) => {
                        const events = getEventsForDay(day)
                        const hasEvents = events.length > 0
                        return (
                          <div
                            key={day}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 transition-colors ${
                              hasEvents
                                ? "bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90"
                                : "hover:bg-muted"
                            }`}
                          >
                            <span className="text-sm font-medium">{day}</span>
                            {hasEvents && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-1" />}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Events List */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">{t.events.upcomingEvents}</h2>
                <div className="space-y-4">
                  {mockData.events.map((event) => (
                    <Card key={event.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="text-center min-w-[50px] p-2 bg-primary rounded-lg text-primary-foreground">
                            <p className="text-lg font-bold leading-none">{new Date(event.date).getDate()}</p>
                            <p className="text-xs mt-1">
                              {new Date(event.date).toLocaleDateString(getDateLocale(), { month: "short" })}
                            </p>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
