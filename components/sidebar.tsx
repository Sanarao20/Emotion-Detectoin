"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, MessageSquare, BarChart3, Camera, FileText, Settings, Menu, X } from "lucide-react"

const navigationItems = [
  { icon: Brain, label: "Emotion Detection", id: "detection" },
  { icon: Camera, label: "Facial Analysis", id: "facial" },
  { icon: FileText, label: "Text Sentiment", id: "text" },
  { icon: MessageSquare, label: "Conversation", id: "conversation" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("detection")

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 pt-12 lg:pt-4">
            <h2 className="text-xl font-bold text-sidebar-foreground">EmotiAI</h2>
            <p className="text-sm text-sidebar-foreground/70">Emotion Detection Platform</p>
          </div>

          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`
                    w-full justify-start gap-3 h-12
                    ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }
                  `}
                  onClick={() => {
                    setActiveItem(item.id)
                    setIsOpen(false)
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          <Card className="p-4 bg-sidebar-accent/20 border-sidebar-border">
            <div className="text-sm text-sidebar-foreground">
              <p className="font-medium mb-1">Pro Features</p>
              <p className="text-xs text-sidebar-foreground/70">
                Upgrade for advanced analytics and unlimited processing
              </p>
              <Button size="sm" className="w-full mt-3 bg-sidebar-primary hover:bg-sidebar-primary/90">
                Upgrade Now
              </Button>
            </div>
          </Card>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
