"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, User, Mail, CheckCircle } from "lucide-react"
import { useAppContext } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"

const services = [
  {
    id: "eye-exam",
    name: "Comprehensive Eye Exam",
    duration: "60 minutes",
    price: 89,
    description: "Complete eye health assessment including vision testing and retinal imaging",
  },
  {
    id: "contact-fitting",
    name: "Contact Lens Fitting",
    duration: "45 minutes",
    price: 75,
    description: "Professional contact lens fitting and training session",
  },
  {
    id: "frame-consultation",
    name: "Frame Style Consultation",
    duration: "30 minutes",
    price: 0,
    description: "Personalized frame selection based on your face shape and style",
  },
  {
    id: "prescription-update",
    name: "Prescription Update",
    duration: "30 minutes",
    price: 45,
    description: "Quick prescription check and update for existing patients",
  },
]

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
]

export function AppointmentBooking() {
  const { state, dispatch } = useAppContext()
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedService, setSelectedService] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedServiceData = services.find((s) => s.id === selectedService)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedService || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date, service, and time slot.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const appointment = {
        id: Date.now().toString(),
        date: selectedDate.toISOString().split("T")[0],
        time: selectedTime,
        service: selectedServiceData?.name || "",
        status: "pending" as const,
      }

      dispatch({ type: "ADD_APPOINTMENT", payload: appointment })

      toast({
        title: "Appointment Booked!",
        description: "We'll send you a confirmation email shortly.",
      })

      // Reset form
      setSelectedDate(undefined)
      setSelectedService("")
      setSelectedTime("")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        notes: "",
      })

      setIsSubmitting(false)
    }, 2000)
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 // Sunday (we're closed on Sundays)
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">Book an Appointment</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Schedule your eye exam or consultation with our experienced optometrists
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Services Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Select Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedService === service.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{service.name}</h3>
                    <div className="text-right">
                      <div className="font-bold text-primary">{service.price === 0 ? "Free" : `$${service.price}`}</div>
                      <Badge variant="secondary" className="text-xs">
                        {service.duration}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Date & Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Choose Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => isPastDate(date) || isWeekend(date)}
                    className="rounded-md border"
                  />
                  <p className="text-xs text-muted-foreground mt-2">* We're closed on Sundays</p>
                </div>

                {/* Time Slots */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Choose Time</Label>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="justify-start"
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">Please select a date first</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or requests..."
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting || !selectedDate || !selectedService || !selectedTime}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking Appointment...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Book Appointment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedServiceData ? (
                <>
                  <div className="space-y-2">
                    <h4 className="font-medium">Service</h4>
                    <p className="text-sm">{selectedServiceData.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedServiceData.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Duration</h4>
                    <p className="text-sm">{selectedServiceData.duration}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Price</h4>
                    <p className="text-lg font-bold text-primary">
                      {selectedServiceData.price === 0 ? "Free" : `$${selectedServiceData.price}`}
                    </p>
                  </div>

                  {selectedDate && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Date</h4>
                      <p className="text-sm">{selectedDate.toLocaleDateString()}</p>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Time</h4>
                      <p className="text-sm">{selectedTime}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">Select a service to see appointment details</p>
              )}

              <div className="pt-4 border-t">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Appointments can be rescheduled up to 24 hours in advance</p>
                  <p>• Please arrive 15 minutes early</p>
                  <p>• Bring your current glasses and insurance card</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
