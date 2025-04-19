"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CheckoutPage() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">(
    "shipping"
  );

  // Mock order summary data
  const orderSummary = {
    subtotal: 249.97,
    shipping: 10.0,
    tax: 25.0,
    total: 284.97,
    items: [
      { name: "Product 1", price: 99.99, quantity: 1 },
      { name: "Product 2", price: 149.99, quantity: 1 },
    ],
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmation");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form - Takes up 2/3 on desktop */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${
                  step === "shipping" || step === "payment" || step === "confirmation"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step === "shipping" ? "1" : <Check className="h-4 w-4" />}
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <Separator className="flex-1 mx-4" />
            <div className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${
                  step === "payment" || step === "confirmation"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step === "payment" ? "2" : step === "confirmation" ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <span className="font-medium">Payment</span>
            </div>
            <Separator className="flex-1 mx-4" />
            <div className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${
                  step === "confirmation"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>

          {step === "shipping" && (
            <Card>
              <form onSubmit={handleShippingSubmit}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="id">
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="id">Indonesia</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button type="submit" className="ml-auto">
                    Continue to Payment
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {step === "payment" && (
            <Card>
              <form onSubmit={handlePaymentSubmit}>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" required />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal">
                      <div className="text-center py-8">
                        <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p>You will be redirected to PayPal to complete your purchase.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between">
                  <Button variant="outline" onClick={() => setStep("shipping")}>
                    Back
                  </Button>
                  <Button type="submit">Complete Order</Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {step === "confirmation" && (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-primary/10 p-4 mx-auto w-fit mb-4">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your purchase. Your order has been received and is being processed.
                </p>
                <p className="font-medium mb-8">Order #12345</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/orders">View Orders</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary - Takes up 1/3 on desktop */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}