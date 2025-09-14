"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  detectedEmotion?: string
  emotionConfidence?: number
}

interface ConversationTone {
  tone: string
  description: string
  color: string
}

export function ConversationEngine() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI conversation partner. I can detect emotions in your messages and adapt my responses accordingly. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentTone, setCurrentTone] = useState<ConversationTone>({
    tone: "Neutral",
    description: "Balanced and professional",
    color: "bg-gray-500",
  })
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const conversationTones: ConversationTone[] = [
    { tone: "Empathetic", description: "Warm and understanding", color: "bg-green-500" },
    { tone: "Encouraging", description: "Positive and motivating", color: "bg-blue-500" },
    { tone: "Calming", description: "Soothing and peaceful", color: "bg-purple-500" },
    { tone: "Professional", description: "Formal and structured", color: "bg-gray-600" },
    { tone: "Casual", description: "Friendly and relaxed", color: "bg-orange-500" },
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const detectMessageEmotion = (message: string): { emotion: string; confidence: number } => {
    // Mock emotion detection - in real implementation, this would call your sentiment analysis API
    const emotions = [
      { emotion: "Happy", keywords: ["good", "great", "awesome", "wonderful", "excited", "love"] },
      { emotion: "Sad", keywords: ["sad", "down", "depressed", "upset", "terrible", "awful"] },
      { emotion: "Angry", keywords: ["angry", "mad", "furious", "annoyed", "frustrated", "hate"] },
      { emotion: "Anxious", keywords: ["worried", "nervous", "anxious", "scared", "afraid", "stress"] },
      { emotion: "Neutral", keywords: [] },
    ]

    const lowerMessage = message.toLowerCase()
    for (const emotionData of emotions) {
      for (const keyword of emotionData.keywords) {
        if (lowerMessage.includes(keyword)) {
          return { emotion: emotionData.emotion, confidence: Math.floor(Math.random() * 20) + 70 }
        }
      }
    }

    return { emotion: "Neutral", confidence: Math.floor(Math.random() * 30) + 50 }
  }

  const generateAIResponse = (userMessage: string, detectedEmotion: string): string => {
    const responses = {
      Happy: [
        "That's wonderful to hear! Your positive energy is contagious. What's been making you feel so good?",
        "I love your enthusiasm! It's great to connect with someone who's feeling upbeat.",
        "Your happiness is evident in your message! Tell me more about what's bringing you joy.",
      ],
      Sad: [
        "I can sense you're going through a difficult time. I'm here to listen if you'd like to share more.",
        "It sounds like you're feeling down. Sometimes talking about what's bothering you can help.",
        "I hear the sadness in your words. Remember that it's okay to feel this way, and you're not alone.",
      ],
      Angry: [
        "I can tell you're feeling frustrated. Take a deep breath - I'm here to help you work through this.",
        "It sounds like something has really upset you. Would you like to talk about what's causing these feelings?",
        "I understand you're angry right now. Let's try to address what's bothering you constructively.",
      ],
      Anxious: [
        "I can sense your worry. Anxiety can be overwhelming, but we can work through this together.",
        "It sounds like you're feeling stressed. What's been on your mind lately?",
        "I hear the concern in your message. Sometimes sharing our worries can help lighten the load.",
      ],
      Neutral: [
        "Thanks for sharing that with me. What would you like to talk about today?",
        "I appreciate you reaching out. How can I help you today?",
        "That's interesting. Tell me more about what's on your mind.",
      ],
    }

    const emotionResponses = responses[detectedEmotion as keyof typeof responses] || responses.Neutral
    return emotionResponses[Math.floor(Math.random() * emotionResponses.length)]
  }

  const updateConversationTone = (emotion: string) => {
    const toneMap: { [key: string]: ConversationTone } = {
      Happy: { tone: "Encouraging", description: "Positive and motivating", color: "bg-blue-500" },
      Sad: { tone: "Empathetic", description: "Warm and understanding", color: "bg-green-500" },
      Angry: { tone: "Calming", description: "Soothing and peaceful", color: "bg-purple-500" },
      Anxious: { tone: "Calming", description: "Soothing and peaceful", color: "bg-purple-500" },
      Neutral: { tone: "Professional", description: "Balanced and professional", color: "bg-gray-500" },
    }

    setCurrentTone(toneMap[emotion] || toneMap.Neutral)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const { emotion, confidence } = detectMessageEmotion(inputMessage)
    updateConversationTone(emotion)

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      detectedEmotion: emotion,
      emotionConfidence: confidence,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse = generateAIResponse(inputMessage, emotion)
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: aiResponse,
      sender: "ai",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Conversation Engine
        </CardTitle>
        <CardDescription>AI-powered conversation with emotion-aware responses</CardDescription>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-medium">Current Tone:</span>
          <Badge className={`${currentTone.color} text-white`}>{currentTone.tone}</Badge>
          <span className="text-xs text-muted-foreground">{currentTone.description}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-80 w-full border rounded-lg p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {message.detectedEmotion && (
                        <Badge variant="outline" className="text-xs">
                          {message.detectedEmotion} ({message.emotionConfidence}%)
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-muted text-muted-foreground rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-sm">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>💡 The AI adapts its conversation tone based on your detected emotions</p>
        </div>
      </CardContent>
    </Card>
  )
}
