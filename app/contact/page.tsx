"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
                <Phone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t.contact.pageTitle}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.contact.pageSubtitle}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">{t.contact.getInTouch}</h2>
                <p className="text-muted-foreground">{t.contact.getInTouchDesc}</p>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{t.contact.address}</p>
                        <p className="text-sm text-muted-foreground">{t.contact.addressValue}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{t.contact.phone}</p>
                        <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{t.contact.email}</p>
                        <p className="text-sm text-muted-foreground">info@agrolife.com</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6 md:p-8">
                    {submitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{t.contact.messageSent}</h3>
                        <p className="text-muted-foreground">{t.contact.thankYou}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-base">
                              {t.contact.yourName}
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder={t.contact.namePlaceholder}
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="h-12 text-base"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-base">
                              {t.contact.emailAddress}
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder={t.contact.emailPlaceholder}
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="h-12 text-base"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-base">
                            {t.contact.subject}
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder={t.contact.subjectPlaceholder}
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="h-12 text-base"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-base">
                            {t.contact.message}
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder={t.contact.messagePlaceholder}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="text-base resize-none"
                          />
                        </div>
                        <Button type="submit" size="lg" className="w-full md:w-auto text-lg px-8">
                          <Send className="w-5 h-5 mr-2" />
                          {t.contact.sendMessage}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-12">
              <Card className="overflow-hidden">
                <div className="aspect-[21/9] bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">{t.contact.mapPlaceholder}</p>
                    <p className="text-sm text-muted-foreground">{t.contact.addressValue}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
