"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, FileText, Loader2 } from "lucide-react"

interface EmotionResult {
  emotion: string
  confidence: number
  color: string
}

export function EmotionDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [textInput, setTextInput] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [facialResults, setFacialResults] = useState<EmotionResult[]>([])
  const [textResults, setTextResults] = useState<EmotionResult[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeFacialEmotion = async () => {
    if (!imageFile) return

    setIsAnalyzing(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock results - in real implementation, this would call your emotion detection API
    const mockResults: EmotionResult[] = [
      { emotion: "Happy", confidence: 85, color: "bg-green-500" },
      { emotion: "Surprised", confidence: 12, color: "bg-yellow-500" },
      { emotion: "Neutral", confidence: 3, color: "bg-gray-500" },
    ]

    setFacialResults(mockResults)
    setIsAnalyzing(false)
  }

  const analyzeTextSentiment = async () => {
    if (!textInput.trim()) return

    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock results - in real implementation, this would call your sentiment analysis API
    const mockResults: EmotionResult[] = [
      { emotion: "Joy", confidence: 78, color: "bg-green-500" },
      { emotion: "Excitement", confidence: 15, color: "bg-blue-500" },
      { emotion: "Optimism", confidence: 7, color: "bg-purple-500" },
    ]

    setTextResults(mockResults)
    setIsAnalyzing(false)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          Emotion Detection
        </CardTitle>
        <CardDescription>Analyze emotions from facial expressions and text sentiment</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="facial" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facial">Facial Analysis</TabsTrigger>
            <TabsTrigger value="text">Text Sentiment</TabsTrigger>
          </TabsList>

          <TabsContent value="facial" className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full max-h-48 mx-auto rounded-lg"
                  />
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm">
                    Change Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-sm font-medium">Upload an image</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                  <Button onClick={() => fileInputRef.current?.click()} className="bg-primary hover:bg-primary/90">
                    Choose File
                  </Button>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            <Button
              onClick={analyzeFacialEmotion}
              disabled={!imageFile || isAnalyzing}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Facial Emotion"
              )}
            </Button>

            {facialResults.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Detected Emotions:</h4>
                {facialResults.map((result, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{result.emotion}</Badge>
                      <span className="text-sm font-medium">{result.confidence}%</span>
                    </div>
                    <Progress value={result.confidence} className="h-2" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <Textarea
              placeholder="Enter text to analyze sentiment and emotions..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="min-h-[120px]"
            />

            <Button
              onClick={analyzeTextSentiment}
              disabled={!textInput.trim() || isAnalyzing}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Analyze Text Sentiment
                </>
              )}
            </Button>

            {textResults.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Detected Emotions:</h4>
                {textResults.map((result, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{result.emotion}</Badge>
                      <span className="text-sm font-medium">{result.confidence}%</span>
                    </div>
                    <Progress value={result.confidence} className="h-2" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
