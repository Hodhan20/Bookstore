import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Banknote, Smartphone, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  paymentMethod: z.enum(["mpesa", "card", "cod"], {
    required_error: "Please select a payment method",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, total, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setLocation("/cart");
    }
  }, [items.length, setLocation]);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "Nairobi",
      paymentMethod: "mpesa",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      const orderNumber = `NOV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderData = {
        orderNumber,
        customer: data,
        items,
        total,
        date: new Date().toISOString()
      };
      
      // Save order to localStorage to show on confirmation page
      localStorage.setItem("novella-latest-order", JSON.stringify(orderData));
      clearCart();
      setLocation("/order-confirmation");
    }, 1500);
  };

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <Link href="/cart">
        <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Cart
        </a>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <h1 className="font-serif text-3xl font-bold mb-8">Checkout</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Delivery Info */}
              <section>
                <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">1. Delivery Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+254 700 000 000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City / Town</FormLabel>
                        <FormControl>
                          <Input placeholder="Nairobi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Apartment, Studio, or Floor, Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <h2 className="text-xl font-bold mb-4 border-b border-border pb-2">2. Payment Method</h2>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          <label className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-colors ${field.value === 'mpesa' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <FormControl>
                              <RadioGroupItem value="mpesa" />
                            </FormControl>
                            <div className="flex items-center gap-2 flex-1">
                              <Smartphone className="w-5 h-5 text-[#4CAF50]" />
                              <span className="font-medium">M-Pesa (Paybill)</span>
                            </div>
                          </label>
                          {field.value === 'mpesa' && (
                            <div className="pl-12 pr-4 pb-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2">
                              You will pay via Lipa na M-Pesa. Paybill: <strong>123456</strong>, Account: <strong>NOVELLA</strong>.
                            </div>
                          )}

                          <label className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-colors ${field.value === 'card' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <FormControl>
                              <RadioGroupItem value="card" />
                            </FormControl>
                            <div className="flex items-center gap-2 flex-1">
                              <CreditCard className="w-5 h-5 text-secondary" />
                              <span className="font-medium">Credit / Debit Card</span>
                            </div>
                          </label>

                          <label className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-colors ${field.value === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                            <FormControl>
                              <RadioGroupItem value="cod" />
                            </FormControl>
                            <div className="flex items-center gap-2 flex-1">
                              <Banknote className="w-5 h-5 text-muted-foreground" />
                              <span className="font-medium">Cash on Delivery</span>
                            </div>
                          </label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <Button type="submit" size="lg" className="w-full py-6 text-lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing Order..." : `Place Order • ${formatKES(total)}`}
              </Button>
            </form>
          </Form>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-4 pb-2 border-b border-border">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.book.id} className="flex gap-4">
                  <div className="relative">
                    <img src={item.book.cover} alt={item.book.title} className="w-16 h-24 object-cover rounded shadow-sm" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white text-xs font-bold rounded-full flex items-center justify-center z-10">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-serif font-bold text-sm leading-tight line-clamp-2 mb-1">{item.book.title}</h4>
                    <span className="text-primary font-bold text-sm mt-auto">{formatKES(item.book.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatKES(total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between items-end border-t border-border pt-4 mt-2">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl text-primary">{formatKES(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}