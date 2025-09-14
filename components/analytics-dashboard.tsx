"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, MessageCircle, Activity } from "lucide-react"
import { EmotionChart } from "@/components/emotion-chart"
import { SentimentTrends } from "@/components/sentiment-trends"
import { ConversationMetrics } from "@/components/conversation-metrics"

interface AnalyticsData {
  totalAnalyses: number
  totalConversations: number
  averageConfidence: number
  topEmotion: string
  emotionDistribution: { emotion: string; count: number; percentage: number }[]
  weeklyTrends: { day: string; positive: number; negative: number; neutral: number }[]
}

export function AnalyticsDashboard() {
  // Mock analytics data - in real implementation, this would come from your database
  const analyticsData: AnalyticsData = {
    totalAnalyses: 1247,
    totalConversations: 89,
    averageConfidence: 82,
    topEmotion: "Happy",
    emotionDistribution: [
      { emotion: "Happy", count: 456, percentage: 36.6 },
      { emotion: "Neutral", count: 312, percentage: 25.0 },
      { emotion: "Excited", count: 189, percentage: 15.2 },
      { emotion: "Sad", count: 156, percentage: 12.5 },
      { emotion: "Angry", count: 89, percentage: 7.1 },
      { emotion: "Anxious", count: 45, percentage: 3.6 },
    ],
    weeklyTrends: [
      { day: "Mon", positive: 65, negative: 20, neutral: 15 },
      { day: "Tue", positive: 72, negative: 18, neutral: 10 },
      { day: "Wed", positive: 58, negative: 25, neutral: 17 },
      { day: "Thu", positive: 81, negative: 12, neutral: 7 },
      { day: "Fri", positive: 69, negative: 22, neutral: 9 },
      { day: "Sat", positive: 45, negative: 35, neutral: 20 },
      { day: "Sun", positive: 52, negative: 28, neutral: 20 },
    ],
  }

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      Happy: "bg-green-500",
      Excited: "bg-blue-500",
      Neutral: "bg-gray-500",
      Sad: "bg-blue-600",
      Angry: "bg-red-500",
      Anxious: "bg-yellow-500",
    }
    return colors[emotion] || "bg-gray-400"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalAnalyses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalConversations}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.averageConfidence}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> accuracy improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Emotion</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className={`${getEmotionColor(analyticsData.topEmotion)} text-white`}>
                {analyticsData.topEmotion}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">36.6% of all detections</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="emotions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emotions">Emotion Distribution</TabsTrigger>
          <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
          <TabsTrigger value="conversations">Conversation Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="emotions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Emotion Distribution</CardTitle>
                <CardDescription>Breakdown of detected emotions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.emotionDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getEmotionColor(item.emotion)}`} />
                          <span className="font-medium">{item.emotion}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{item.count}</span>
                          <span className="text-sm text-muted-foreground ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <EmotionChart data={analyticsData.emotionDistribution} />
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <SentimentTrends data={analyticsData.weeklyTrends} />
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <ConversationMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
