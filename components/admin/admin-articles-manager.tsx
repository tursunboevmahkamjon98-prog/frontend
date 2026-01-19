"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/lib/i18n/language-context"

interface ArticleItem {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  status: "published" | "draft"
}

const initialArticles: ArticleItem[] = [
  {
    id: "1",
    title: "Complete Guide to Organic Farming",
    excerpt: "Learn the fundamentals of organic farming...",
    category: "organic",
    readTime: "8 min",
    status: "published",
  },
  {
    id: "2",
    title: "Soil Health Management Tips",
    excerpt: "Discover how to maintain healthy soil...",
    category: "soilHealth",
    readTime: "5 min",
    status: "published",
  },
]

export function AdminArticlesManager() {
  const { t } = useLanguage()
  const [articles, setArticles] = useState<ArticleItem[]>(initialArticles)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ArticleItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "farmingBasics",
    readTime: "5 min",
    status: "draft" as "published" | "draft",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      setArticles(articles.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
    } else {
      const newItem: ArticleItem = {
        id: Date.now().toString(),
        ...formData,
      }
      setArticles([newItem, ...articles])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      category: "farmingBasics",
      readTime: "5 min",
      status: "draft",
    })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: ArticleItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      readTime: item.readTime,
      status: item.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm(t.admin.confirmDelete)) {
      setArticles(articles.filter((item) => item.id !== id))
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.admin.manageArticles}</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="w-4 h-4 mr-2" />
              {t.admin.addNew}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? t.admin.edit : t.admin.addNew}</DialogTitle>
              <DialogDescription>{editingItem ? "Edit article details" : "Add a new article"}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t.admin.title_field}</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t.admin.content}</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t.admin.category}</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmingBasics">{t.categories.farmingBasics}</SelectItem>
                      <SelectItem value="organic">{t.categories.organic}</SelectItem>
                      <SelectItem value="soilHealth">{t.categories.soilHealth}</SelectItem>
                      <SelectItem value="irrigation">{t.categories.irrigation}</SelectItem>
                      <SelectItem value="livestock">{t.categories.livestock}</SelectItem>
                      <SelectItem value="vegetables">{t.categories.vegetables}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">{t.admin.status}</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "published" | "draft") => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">{t.admin.published}</SelectItem>
                      <SelectItem value="draft">{t.admin.draft}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  {t.admin.cancel}
                </Button>
                <Button type="submit">{t.admin.save}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">{t.admin.title_field}</th>
                <th className="text-left py-3 px-4 font-medium">{t.admin.category}</th>
                <th className="text-left py-3 px-4 font-medium">{t.admin.status}</th>
                <th className="text-right py-3 px-4 font-medium">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((item) => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.readTime} {t.articles.read}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-muted rounded-md text-sm capitalize">{item.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-md text-sm ${
                        item.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status === "published" ? t.admin.published : t.admin.draft}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
