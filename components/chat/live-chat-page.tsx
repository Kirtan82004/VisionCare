"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Paperclip, Smile, Phone, Video, MoreVertical, User, Bot } from "lucide-react"
import { useAppContext } from "@/components/providers"

interface Message {
  id: string
  content: string
  sender: "user" | "agent" | "system"
  timestamp: Date
  senderName?: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! Welcome to VisionCare live chat. I'm Sarah, your customer service representative. How can I help you today?",
    sender: "agent",
    senderName: "Sarah Johnson",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    content: "Hi! I'm interested in booking an eye exam appointment.",
    sender: "user",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "3",
    content:
      "I'd be happy to help you book an appointment! What type of eye exam are you looking for? We offer comprehensive eye exams, contact lens fittings, and specialized consultations.",
    sender: "agent",
    senderName: "Sarah Johnson",
    timestamp: new Date(Date.now() - 180000),
  },
]

const quickReplies = [
  "Book an appointment",
  "Check my order status",
  "Product information",
  "Insurance questions",
  "Store hours",
  "Return policy",
]

export function LiveChatPage() {
  const { state } = useAppContext()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

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
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = getAgentResponse(content)
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: agentResponse,
        sender: "agent",
        senderName: "Sarah Johnson",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 2000)
  }

  const getAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("appointment") || message.includes("book")) {
      return "Perfect! I can help you schedule an appointment. Our next available slots are tomorrow at 2:00 PM or Thursday at 10:00 AM. Which works better for you?"
    }

    if (message.includes("order") || message.includes("status")) {
      return "I can help you check your order status. Could you please provide your order number or the email address associated with your order?"
    }

    if (message.includes("hours") || message.includes("open")) {
      return "Our store hours are Monday-Saturday 9AM-7PM and Sunday 11AM-5PM. We're currently open and ready to help you!"
    }

    if (message.includes("insurance")) {
      return "We accept most major insurance plans including VSP, EyeMed, Davis Vision, and many others. Would you like me to check if we accept your specific insurance?"
    }

    if (message.includes("return") || message.includes("exchange")) {
      return "We offer a 30-day return policy for unworn frames and a 90-day exchange policy. Do you have a specific item you'd like to return or exchange?"
    }

    return "Thank you for your message! Let me connect you with a specialist who can better assist you with that. In the meantime, is there anything else I can help you with?"
  }

  const handleQuickReply = (reply: string) => {
    sendMessage(reply)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Live Chat Support</h1>
        <p className="text-muted-foreground">Get instant help from our customer service team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Agent" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
                    <span className="text-sm text-muted-foreground">{isOnline ? "Online" : "Offline"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {message.sender === "user" ? (
                            <User className="h-4 w-4" />
                          ) : message.sender === "agent" ? (
                            "SJ"
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground"
                            : message.sender === "agent"
                              ? "bg-muted"
                              : "bg-blue-50 border border-blue-200"
                        }`}
                      >
                        {message.senderName && message.sender === "agent" && (
                          <div className="text-xs font-medium mb-1 text-muted-foreground">{message.senderName}</div>
                        )}
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">SJ</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            <div className="p-4 border-t">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 justify-start"
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
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
                  className="flex-1"
                />
                <Button size="icon" variant="ghost">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={() => sendMessage(inputValue)} disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Chat Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chat Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Wait Time</span>
                <span className="text-sm font-medium">&lt; 1 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Queue Position</span>
                <span className="text-sm font-medium">1 of 1</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Start New Chat
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Request Call Back
              </Button>
              <Button className="w-full justify-start" variant="outline" size="sm">
                <Video className="mr-2 h-4 w-4" />
                Video Consultation
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Common Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Store Hours</h4>
                <p className="text-xs text-muted-foreground">Mon-Sat: 9AM-7PM, Sun: 11AM-5PM</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Return Policy</h4>
                <p className="text-xs text-muted-foreground">30-day returns, 90-day exchanges</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Insurance</h4>
                <p className="text-xs text-muted-foreground">We accept most major plans</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
