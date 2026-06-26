import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowLeft, Truck, BookOpen, ShieldCheck } from "lucide-react";
import { books } from "@/data/books";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookGrid } from "@/components/books/BookGrid";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";

export default function BookDetails() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const book = books.find((b) => b.id === params.id);
  const relatedBooks = book 
    ? books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4)
    : [];

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <SkeletonLoader className="aspect-[3/4] w-full max-w-md mx-auto rounded-lg" />
          <div className="space-y-6">
            <SkeletonLoader className="h-10 w-3/4" />
            <SkeletonLoader className="h-6 w-1/2" />
            <SkeletonLoader className="h-32 w-full" />
            <SkeletonLoader className="h-12 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Book not found</h1>
        <p className="text-muted-foreground mb-8">The book you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      <Link href="/shop">
        <a className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </a>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-full rounded-lg shadow-2xl"
            />
            {book.badge && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1.5 rounded-md shadow-md">
                {book.badge}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
              {book.category} {book.subcategory && `• ${book.subcategory}`}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-foreground">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">by <span className="text-foreground font-medium">{book.author}</span></p>
          
          <div className="flex items-center space-x-2 mb-6 bg-card w-fit px-4 py-2 rounded-full border border-border">
            <div className="flex text-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="font-medium">{book.rating}</span>
            <span className="text-muted-foreground text-sm">({book.reviews} reviews)</span>
          </div>

          <div className="mb-8 flex items-end space-x-4">
            <span className="text-4xl font-bold text-primary">{formatKES(book.price)}</span>
            {book.originalPrice && (
              <span className="text-xl text-muted-foreground line-through mb-1">
                {formatKES(book.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground mb-10 border-b border-border pb-10">
            {book.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              size="lg" 
              className="flex-1 text-lg py-6" 
              onClick={() => addToCart(book)}
              disabled={!book.inStock}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {book.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-6 rounded-lg border border-border">
            <div>
              <span className="text-muted-foreground block mb-1">Publisher</span>
              <span className="font-medium text-foreground">{book.publisher || "Novella Books"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Pages</span>
              <span className="font-medium text-foreground">{book.pages || "N/A"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">ISBN</span>
              <span className="font-medium text-foreground">{book.isbn || "N/A"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">Format</span>
              <span className="font-medium text-foreground">Hardcover</span>
            </div>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {relatedBooks.length > 0 && (
        <div className="pt-16 border-t border-border">
          <h2 className="font-serif text-3xl font-bold mb-8">You might also like</h2>
          <BookGrid books={relatedBooks} />
        </div>
      )}
    </motion.div>
  );
}