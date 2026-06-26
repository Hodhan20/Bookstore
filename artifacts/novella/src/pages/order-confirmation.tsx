import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatKES } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/config/whatsapp";
import { CartItem } from "@/context/CartContext";

export default function OrderConfirmation() {
  const [, setLocation] = useLocation();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("novella-latest-order");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  const handleWhatsAppAction = () => {
    if (!order) return;
    
    const message = `*New Order: ${order.orderNumber}*
    
Name: ${order.customer.fullName}
Payment Method: ${order.customer.paymentMethod.toUpperCase()}
Total: ${formatKES(order.total)}

Items:
${order.items.map((i: CartItem) => `- ${i.quantity}x ${i.book.title}`).join('\n')}

Delivery: ${order.customer.address}, ${order.customer.city}

Thank you for shopping with Novella!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  if (!order) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="container mx-auto px-4 py-16 max-w-3xl"
    >
      <div className="bg-card border border-border rounded-xl shadow-lg p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Thank you for your order!</h1>
        <p className="text-muted-foreground mb-8">
          Order number: <span className="font-bold text-foreground">{order.orderNumber}</span>
        </p>

        <div className="bg-muted/50 rounded-lg p-6 text-left mb-8">
          <h3 className="font-serif text-xl font-bold mb-4 border-b border-border pb-2">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Customer</p>
              <p className="font-medium">{order.customer.fullName}</p>
              <p className="text-sm">{order.customer.email}</p>
              <p className="text-sm">{order.customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Delivery Address</p>
              <p className="font-medium">{order.customer.address}</p>
              <p className="text-sm">{order.customer.city}</p>
              <p className="text-sm mt-2 text-muted-foreground">Method: <span className="font-medium uppercase text-foreground">{order.customer.paymentMethod}</span></p>
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            <h4 className="font-bold text-sm mb-3">Items</h4>
            <div className="space-y-2 mb-4">
              {order.items.map((item: CartItem) => (
                <div key={item.book.id} className="flex justify-between text-sm">
                  <span>{item.quantity}x {item.book.title}</span>
                  <span className="font-medium">{formatKES(item.book.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-border pt-3 font-bold text-lg">
              <span>Total Paid</span>
              <span className="text-primary">{formatKES(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleWhatsAppAction} size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white">
            <MessageCircle className="w-5 h-5 mr-2" />
            Send Order via WhatsApp
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}