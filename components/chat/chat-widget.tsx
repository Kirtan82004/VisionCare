"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your VisionCare AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

const quickReplies = [
  "Book an appointment",
  "Find glasses for my face shape",
  "Check prescription status",
  "Store hours and location",
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const sendMessage = (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("appointment") || message.includes("book")) {
      return "I can help you book an appointment! Our available slots are Monday-Saturday 9AM-7PM. Would you like me to check availability for a specific date?"
    }

    if (message.includes("face shape") || message.includes("glasses")) {
      return "I'd be happy to help you find the perfect glasses! Can you tell me your face shape (round, oval, square, heart, or diamond)? Or would you like me to guide you through determining your face shape?"
    }

    if (message.includes("prescription") || message.includes("status")) {
      return "To check your prescription status, I'll need your order number or the email address used for the order. You can also call us at (555) 123-4567 for immediate assistance."
    }

    if (message.includes("hours") || message.includes("location") || message.includes("store")) {
      return "Our store is located at 123 Vision Street, Eye City, EC 12345. We're open Monday-Saturday 9AM-7PM and Sunday 11AM-5PM. You can reach us at (555) 123-4567."
    }

    if (message.includes("price") || message.includes("cost")) {
      return "Our glasses start from $149 including basic lenses. Premium lenses and designer frames are available at additional cost. Would you like information about specific products or services?"
    }

    return "Thank you for your question! For detailed assistance, I recommend speaking with one of our specialists. You can book an appointment online or call us at (555) 123-4567. Is there anything specific about our products or services I can help you with?"
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Bot className="h-5 w-5 text-primary" />
          <span>VisionCare Assistant</span>
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {message.sender === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
              className="flex-1"
            />
            <Button size="icon" onClick={() => sendMessage(inputValue)} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
