import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    toast.success("Message sent successfully! We'll get back to you soon.");
    form.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">
          Have a question about a book, an order, or just want to chat about literature? We're here for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2">Visit Us</h3>
            <p className="text-muted-foreground">Digo Road<br/>Mombasa, Kenya</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2">Call Us</h3>
            <p className="text-muted-foreground">0112090878<br/>Mon-Sat: 9am - 6pm</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2">Email Us</h3>
            <p className="text-muted-foreground">abdullahihodhan20@gmail.com<br/>We reply within 24 hours</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-8">
          <h2 className="font-serif text-2xl font-bold mb-6">Send a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
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
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="How can we help you?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your message here..." className="min-h-[150px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}