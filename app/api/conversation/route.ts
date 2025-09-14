import { type NextRequest, NextResponse } from "next/server"

interface ConversationRequest {
  message: string
  detectedEmotion?: string
  conversationHistory?: Array<{ role: string; content: string }>
}

export async function POST(request: NextRequest) {
  try {
    const { message, detectedEmotion, conversationHistory = [] }: ConversationRequest = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "No message provided" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Use a local LLM like Llama 2, Mistral, or Falcon
    // 2. Or integrate with OpenAI/Gemini APIs
    // 3. Adapt the response tone based on detected emotion
    // 4. Maintain conversation context

    const emotionBasedResponses = {
      Happy: [
        "That's wonderful to hear! Your positive energy is contagious. What's been making you feel so good?",
        "I love your enthusiasm! It's great to connect with someone who's feeling upbeat.",
        "Your happiness is evident in your message! Tell me more about what's bringing you joy.",
      ],
      Joy: [
        "That's fantastic! Your joy is really coming through. What's been the highlight of your day?",
        "I can feel your positive energy! It's wonderful to see you so happy.",
        "Your joyful spirit is infectious! What's been making you feel this way?",
      ],
      Sadness: [
        "I can sense you're going through a difficult time. I'm here to listen if you'd like to share more.",
        "It sounds like you're feeling down. Sometimes talking about what's bothering you can help.",
        "I hear the sadness in your words. Remember that it's okay to feel this way, and you're not alone.",
      ],
      Sad: [
        "I'm sorry you're feeling this way. Would you like to talk about what's troubling you?",
        "It's completely normal to feel sad sometimes. I'm here to support you through this.",
        "Your feelings are valid. Sometimes sharing what's on your mind can provide some relief.",
      ],
      Anger: [
        "I can tell you're feeling frustrated. Take a deep breath - I'm here to help you work through this.",
        "It sounds like something has really upset you. Would you like to talk about what's causing these feelings?",
        "I understand you're angry right now. Let's try to address what's bothering you constructively.",
      ],
      Fear: [
        "I can sense your worry. Fear can be overwhelming, but we can work through this together.",
        "It sounds like you're feeling anxious. What's been on your mind lately?",
        "I hear the concern in your message. Sometimes sharing our fears can help lighten the load.",
      ],
      Neutral: [
        "Thanks for sharing that with me. What would you like to talk about today?",
        "I appreciate you reaching out. How can I help you today?",
        "That's interesting. Tell me more about what's on your mind.",
      ],
    }

    const emotion = detectedEmotion || "Neutral"
    const responses =
      emotionBasedResponses[emotion as keyof typeof emotionBasedResponses] || emotionBasedResponses.Neutral
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)]

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1200))

    return NextResponse.json({
      success: true,
      response: selectedResponse,
      detectedEmotion: emotion,
      adaptedTone: getAdaptedTone(emotion),
      processingTime: "1.2s",
      model: "Llama-2-7B-Chat",
    })
  } catch (error) {
    console.error("Conversation API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

function getAdaptedTone(emotion: string): string {
  const toneMap: { [key: string]: string } = {
    Happy: "Encouraging",
    Joy: "Enthusiastic",
    Sadness: "Empathetic",
    Sad: "Supportive",
    Anger: "Calming",
    Fear: "Reassuring",
    Neutral: "Professional",
  }
  return toneMap[emotion] || "Professional"
}
