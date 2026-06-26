import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatKES } from "@/lib/utils";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-24 text-center max-w-md"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any books to your cart yet.</p>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div 
              key={item.book.id} 
              className="flex flex-col sm:flex-row gap-6 bg-card border border-border p-4 rounded-lg items-center relative pr-12 sm:pr-4"
            >
              <button 
                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors sm:static sm:order-last"
                onClick={() => removeFromCart(item.book.id)}
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <Link href={`/book/${item.book.id}`}>
                <a className="shrink-0">
                  <img 
                    src={item.book.cover} 
                    alt={item.book.title}
                    className="w-24 h-36 object-cover rounded shadow-sm"
                  />
                </a>
              </Link>
              
              <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                <Link href={`/book/${item.book.id}`}>
                  <a className="font-serif font-bold text-lg mb-1 hover:text-primary">{item.book.title}</a>
                </Link>
                <p className="text-muted-foreground text-sm mb-4">{item.book.author}</p>
                <div className="font-bold text-primary">{formatKES(item.book.price)}</div>
              </div>

              <div className="flex items-center bg-muted rounded-full p-1 border border-border">
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors text-foreground"
                  onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">{item.quantity}</span>
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background transition-colors text-foreground"
                  onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="hidden sm:block text-right min-w-[100px] font-bold text-lg">
                {formatKES(item.book.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <h2 className="font-serif text-xl font-bold mb-6 pb-4 border-b border-border">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({itemCount} items)</span>
                <span className="text-foreground font-medium">{formatKES(total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-foreground font-medium">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end border-t border-border pt-4 mb-8">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl text-primary">{formatKES(total)}</span>
            </div>

            <Button asChild size="lg" className="w-full text-md py-6">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Secure, encrypted checkout</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}