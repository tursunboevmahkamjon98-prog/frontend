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

interface VideoItem {
  id: string
  title: string
  description: string
  category: string
  duration: string
  videoUrl: string
  status: "published" | "draft"
}

const initialVideos: VideoItem[] = [
  {
    id: "1",
    title: "Modern Irrigation Techniques",
    description: "Learn about efficient water management...",
    category: "irrigation",
    duration: "15:30",
    videoUrl: "https://youtube.com/watch?v=example1",
    status: "published",
  },
  {
    id: "2",
    title: "Organic Pest Control",
    description: "Natural methods to protect your crops...",
    category: "organic",
    duration: "12:45",
    videoUrl: "https://youtube.com/watch?v=example2",
    status: "published",
  },
]

export function AdminVideosManager() {
  const { t } = useLanguage()
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<VideoItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "farmingBasics",
    duration: "",
    videoUrl: "",
    status: "draft" as "published" | "draft",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      setVideos(videos.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
    } else {
      const newItem: VideoItem = {
        id: Date.now().toString(),
        ...formData,
      }
      setVideos([newItem, ...videos])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "farmingBasics",
      duration: "",
      videoUrl: "",
      status: "draft",
    })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: VideoItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      duration: item.duration,
      videoUrl: item.videoUrl,
      status: item.status,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm(t.admin.confirmDelete)) {
      setVideos(videos.filter((item) => item.id !== id))
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.admin.manageVideos}</CardTitle>
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
              <DialogDescription>{editingItem ? "Edit video details" : "Add a new video"}</DialogDescription>
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
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                      <SelectItem value="irrigation">{t.categories.irrigation}</SelectItem>
                      <SelectItem value="livestock">{t.categories.livestock}</SelectItem>
                      <SelectItem value="equipment">{t.categories.equipment}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="15:30"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Video URL</label>
                <Input
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
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
                <th className="text-left py-3 px-4 font-medium">Duration</th>
                <th className="text-left py-3 px-4 font-medium">{t.admin.status}</th>
                <th className="text-right py-3 px-4 font-medium">{t.admin.actions}</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((item) => (
                <tr key={item.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-muted rounded-md text-sm capitalize">{item.category}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{item.duration}</td>
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
