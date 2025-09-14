import { Sidebar } from "@/components/sidebar"
import { EmotionDetection } from "@/components/emotion-detection"
import { ConversationEngine } from "@/components/conversation-engine"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">EmotiAI Platform</h1>
            <p className="text-lg text-muted-foreground">
              Advanced emotion detection and intelligent conversation analysis
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <EmotionDetection />
            <ConversationEngine />
          </div>

          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  )
}
