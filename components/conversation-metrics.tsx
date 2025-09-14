"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Clock, TrendingUp, Users } from "lucide-react"

export function ConversationMetrics() {
  // Mock conversation metrics data
  const conversationData = [
    { time: "00:00", conversations: 12 },
    { time: "04:00", conversations: 8 },
    { time: "08:00", conversations: 25 },
    { time: "12:00", conversations: 45 },
    { time: "16:00", conversations: 38 },
    { time: "20:00", conversations: 22 },
  ]

  const metrics = {
    averageSessionLength: "8.5 min",
    responseAccuracy: 94,
    userSatisfaction: 4.7,
    totalMessages: 2847,
    activeUsers: 156,
    peakHour: "12:00 PM",
  }

  const topTopics = [
    { topic: "Work Stress", count: 89, sentiment: "Negative" },
    { topic: "Personal Growth", count: 67, sentiment: "Positive" },
    { topic: "Relationships", count: 54, sentiment: "Mixed" },
    { topic: "Health & Wellness", count: 43, sentiment: "Positive" },
    { topic: "Career Goals", count: 38, sentiment: "Positive" },
  ]

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-500"
      case "Negative":
        return "bg-red-500"
      case "Mixed":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Length</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageSessionLength}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.responseAccuracy}%</div>
            <Progress value={metrics.responseAccuracy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.userSatisfaction}/5.0</div>
            <p className="text-xs text-muted-foreground">Based on user feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Activity</CardTitle>
          <CardDescription>Number of conversations throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="conversations" stroke="#ea580c" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Discussion Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Top Discussion Topics</CardTitle>
          <CardDescription>Most frequently discussed topics in conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm bg-muted px-2 py-1 rounded">#{index + 1}</span>
                  <span className="font-medium">{topic.topic}</span>
                  <Badge className={`${getSentimentColor(topic.sentiment)} text-white text-xs`}>
                    {topic.sentiment}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="font-medium">{topic.count}</span>
                  <span className="text-sm text-muted-foreground ml-1">mentions</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
