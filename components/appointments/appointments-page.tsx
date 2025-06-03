"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, User, MapPin, Phone, Mail, Plus, Edit, CheckCircle, XCircle } from "lucide-react"
import { useAppContext } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"

const mockAppointments = [
  {
    id: "1",
    date: "2024-01-25",
    time: "10:00 AM",
    service: "Comprehensive Eye Exam",
    doctor: "Dr. Sarah Johnson",
    status: "confirmed",
    location: "Main Office",
    duration: "60 minutes",
    notes: "Annual checkup",
  },
  {
    id: "2",
    date: "2024-01-20",
    time: "2:00 PM",
    service: "Contact Lens Fitting",
    doctor: "Dr. Michael Chen",
    status: "completed",
    location: "Main Office",
    duration: "45 minutes",
    notes: "First time contact lens user",
  },
  {
    id: "3",
    date: "2024-02-05",
    time: "11:30 AM",
    service: "Frame Consultation",
    doctor: "Lisa Thompson",
    status: "pending",
    location: "Main Office",
    duration: "30 minutes",
    notes: "Looking for progressive lenses",
  },
]

export function AppointmentsPage() {
  const { state } = useAppContext()
  const { toast } = useToast()
  const [appointments, setAppointments] = useState(mockAppointments)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt)))
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    })
  }

  const confirmAppointment = (id: string) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === id ? { ...apt, status: "confirmed" } : apt)))
    toast({
      title: "Appointment Confirmed",
      description: "Your appointment has been confirmed.",
    })
  }

  const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed" || apt.status === "pending")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed" || apt.status === "cancelled")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">My Appointments</h1>
          <p className="text-muted-foreground">Manage your eye care appointments and view your history</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/appointment">
            <Plus className="mr-2 h-5 w-5" />
            Book New Appointment
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-6">You don't have any upcoming appointments scheduled.</p>
                <Button asChild>
                  <Link href="/appointment">
                    <Plus className="mr-2 h-4 w-4" />
                    Book Your First Appointment
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{appointment.service}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{appointment.doctor}</span>
                      </div>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(appointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{appointment.duration}</span>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {appointment.status === "pending" && (
                        <Button size="sm" onClick={() => confirmAppointment(appointment.id)} className="flex-1">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Confirm
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelAppointment(appointment.id)}
                        className="flex-1"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>

                    <div className="pt-3 border-t space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>Need to reschedule? Call +1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>Confirmation sent to {state.user?.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          {pastAppointments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Past Appointments</h3>
                <p className="text-muted-foreground">Your appointment history will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-4">
                          <h3 className="text-lg font-semibold">{appointment.service}</h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{appointment.doctor}</span>
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {appointment.status === "completed" && (
                          <Button variant="outline" size="sm">
                            Book Follow-up
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col space-y-2" asChild>
              <Link href="/appointment">
                <Plus className="h-6 w-6" />
                <span>Book New Appointment</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Phone className="h-6 w-6" />
              <span>Call Office</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Mail className="h-6 w-6" />
              <span>Email Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
