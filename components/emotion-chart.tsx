"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface EmotionData {
  emotion: string
  count: number
  percentage: number
}

interface EmotionChartProps {
  data: EmotionData[]
}

const COLORS = {
  Happy: "#10b981",
  Excited: "#3b82f6",
  Neutral: "#6b7280",
  Sad: "#2563eb",
  Angry: "#ef4444",
  Anxious: "#eab308",
}

export function EmotionChart({ data }: EmotionChartProps) {
  const chartData = data.map((item) => ({
    name: item.emotion,
    value: item.count,
    percentage: item.percentage,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotion Pie Chart</CardTitle>
        <CardDescription>Visual representation of emotion distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "#6b7280"} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [value, "Count"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
