"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Truck, Shield, Upload, Eye, Lock, CheckCircle } from "lucide-react"
import { useAppContext } from "@/components/providers"
import { useToast } from "@/hooks/use-toast"

export function CheckoutPage() {
  const { state, dispatch } = useAppContext()
  const { toast } = useToast()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveCard: false,
  })

  const [prescriptionInfo, setPrescriptionInfo] = useState({
    hasPrescription: false,
    uploadMethod: "file",
    prescriptionFile: null as File | null,
    doctorName: "",
    prescriptionDate: "",
    rightEye: {
      sphere: "",
      cylinder: "",
      axis: "",
      add: "",
    },
    leftEye: {
      sphere: "",
      cylinder: "",
      axis: "",
      add: "",
    },
    pd: "",
  })

  const [insuranceInfo, setInsuranceInfo] = useState({
    useInsurance: false,
    provider: "",
    memberId: "",
    groupNumber: "",
    subscriberName: "",
  })

  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const insuranceDiscount = insuranceInfo.useInsurance ? subtotal * 0.2 : 0
  const total = subtotal + shipping + tax - insuranceDiscount

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" })
      toast({
        title: "Order Placed Successfully!",
        description: "You'll receive a confirmation email shortly.",
      })
      router.push("/order-confirmation")
      setIsProcessing(false)
    }, 3000)
  }

  const needsPrescription = state.cart.some((item) => item.product.category === "glasses")

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">Add some items to your cart before checking out.</p>
          <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 4 && <div className={`w-12 h-0.5 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Shipping Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                  <Input
                    id="apartment"
                    value={shippingInfo.apartment}
                    onChange={(e) => setShippingInfo((prev) => ({ ...prev, apartment: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, city: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={shippingInfo.state}
                      onValueChange={(value) => setShippingInfo((prev) => ({ ...prev, state: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => setShippingInfo((prev) => ({ ...prev, zipCode: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <Button onClick={handleNextStep} className="w-full">
                  Continue to {needsPrescription ? "Prescription" : "Payment"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Prescription Information (if needed) */}
          {currentStep === 2 && needsPrescription && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Prescription Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasPrescription"
                    checked={prescriptionInfo.hasPrescription}
                    onCheckedChange={(checked) =>
                      setPrescriptionInfo((prev) => ({ ...prev, hasPrescription: checked as boolean }))
                    }
                  />
                  <Label htmlFor="hasPrescription">I have a prescription</Label>
                </div>

                {prescriptionInfo.hasPrescription && (
                  <Tabs
                    value={prescriptionInfo.uploadMethod}
                    onValueChange={(value) => setPrescriptionInfo((prev) => ({ ...prev, uploadMethod: value }))}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="file">Upload Prescription</TabsTrigger>
                      <TabsTrigger value="manual">Enter Manually</TabsTrigger>
                    </TabsList>

                    <TabsContent value="file" className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-4">
                          Upload a photo or scan of your prescription
                        </p>
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="manual" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Right Eye (OD)</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs">Sphere (SPH)</Label>
                              <Input
                                value={prescriptionInfo.rightEye.sphere}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    rightEye: { ...prev.rightEye, sphere: e.target.value },
                                  }))
                                }
                                placeholder="+/-0.00"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Cylinder (CYL)</Label>
                              <Input
                                value={prescriptionInfo.rightEye.cylinder}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    rightEye: { ...prev.rightEye, cylinder: e.target.value },
                                  }))
                                }
                                placeholder="+/-0.00"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Axis</Label>
                              <Input
                                value={prescriptionInfo.rightEye.axis}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    rightEye: { ...prev.rightEye, axis: e.target.value },
                                  }))
                                }
                                placeholder="0-180"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Add</Label>
                              <Input
                                value={prescriptionInfo.rightEye.add}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    rightEye: { ...prev.rightEye, add: e.target.value },
                                  }))
                                }
                                placeholder="+0.00"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Left Eye (OS)</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <Label className="text-xs">Sphere (SPH)</Label>
                              <Input
                                value={prescriptionInfo.leftEye.sphere}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    leftEye: { ...prev.leftEye, sphere: e.target.value },
                                  }))
                                }
                                placeholder="+/-0.00"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Cylinder (CYL)</Label>
                              <Input
                                value={prescriptionInfo.leftEye.cylinder}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    leftEye: { ...prev.leftEye, cylinder: e.target.value },
                                  }))
                                }
                                placeholder="+/-0.00"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Axis</Label>
                              <Input
                                value={prescriptionInfo.leftEye.axis}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    leftEye: { ...prev.leftEye, axis: e.target.value },
                                  }))
                                }
                                placeholder="0-180"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Add</Label>
                              <Input
                                value={prescriptionInfo.leftEye.add}
                                onChange={(e) =>
                                  setPrescriptionInfo((prev) => ({
                                    ...prev,
                                    leftEye: { ...prev.leftEye, add: e.target.value },
                                  }))
                                }
                                placeholder="+0.00"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pd">Pupillary Distance (PD)</Label>
                        <Input
                          id="pd"
                          value={prescriptionInfo.pd}
                          onChange={(e) => setPrescriptionInfo((prev) => ({ ...prev, pd: e.target.value }))}
                          placeholder="62mm"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                )}

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment Information */}
          {currentStep === (needsPrescription ? 3 : 2) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Insurance Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="useInsurance"
                      checked={insuranceInfo.useInsurance}
                      onCheckedChange={(checked) =>
                        setInsuranceInfo((prev) => ({ ...prev, useInsurance: checked as boolean }))
                      }
                    />
                    <Label htmlFor="useInsurance">Use Insurance Benefits</Label>
                  </div>

                  {insuranceInfo.useInsurance && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="provider">Insurance Provider</Label>
                        <Select
                          value={insuranceInfo.provider}
                          onValueChange={(value) => setInsuranceInfo((prev) => ({ ...prev, provider: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vsp">VSP Vision Care</SelectItem>
                            <SelectItem value="eyemed">EyeMed</SelectItem>
                            <SelectItem value="davis">Davis Vision</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="memberId">Member ID</Label>
                        <Input
                          id="memberId"
                          value={insuranceInfo.memberId}
                          onChange={(e) => setInsuranceInfo((prev) => ({ ...prev, memberId: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Payment Method */}
                <Tabs
                  value={paymentInfo.method}
                  onValueChange={(value) => setPaymentInfo((prev) => ({ ...prev, method: value }))}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, expiryDate: e.target.value }))}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo((prev) => ({ ...prev, nameOnCard: e.target.value }))}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal" className="space-y-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        You'll be redirected to PayPal to complete your payment
                      </p>
                      <Button variant="outline" className="bg-[#0070ba] text-white hover:bg-[#005ea6]">
                        Continue with PayPal
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="apple" className="space-y-4">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Use Touch ID or Face ID to pay with Apple Pay</p>
                      <Button variant="outline" className="bg-black text-white hover:bg-gray-800">
                        Pay with Apple Pay
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1">
                    Review Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Order Review */}
          {currentStep === (needsPrescription ? 4 : 3) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Review Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Items */}
                <div className="space-y-4">
                  <h4 className="font-medium">Order Items</h4>
                  {state.cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium">{item.product.name}</h5>
                        <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Shipping Address */}
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p>{shippingInfo.address}</p>
                    {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
                    <p>
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} className="flex-1" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Place Order
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {insuranceDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Insurance Discount</span>
                    <span>-${insuranceDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>30-day return guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
