"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface TrendData {
  day: string
  positive: number
  negative: number
  neutral: number
}

interface SentimentTrendsProps {
  data: TrendData[]
}

export function SentimentTrends({ data }: SentimentTrendsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Sentiment Trends</CardTitle>
        <CardDescription>Sentiment analysis trends over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive" />
            <Bar dataKey="neutral" stackId="a" fill="#6b7280" name="Neutral" />
            <Bar dataKey="negative" stackId="a" fill="#ef4444" name="Negative" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
