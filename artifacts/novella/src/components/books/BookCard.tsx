import { memo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { Book } from "@/data/books";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  index?: number;
}

export const BookCard = memo(function BookCard({ book, index = 0 }: BookCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      data-testid={`card-book-${book.id}`}
    >
      <Link
        href={`/book/${book.id}`}
        className="relative aspect-[3/4] overflow-hidden block"
        data-testid={`link-book-cover-${book.id}`}
      >
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {book.badge && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            {book.badge}
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-secondary font-semibold mb-1 uppercase tracking-wider">
          {book.subcategory ?? book.category}
        </div>
        <Link
          href={`/book/${book.id}`}
          className="font-serif text-lg font-bold text-foreground line-clamp-1 hover:text-primary transition-colors"
          data-testid={`link-book-title-${book.id}`}
        >
          {book.title}
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>

        <div className="flex items-center space-x-1 mb-4">
          <Star className="w-4 h-4 fill-secondary text-secondary" />
          <span className="text-sm font-medium text-foreground">{book.rating}</span>
          <span className="text-xs text-muted-foreground">({book.reviews.toLocaleString()})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-primary" data-testid={`text-price-${book.id}`}>
              {formatKES(book.price)}
            </span>
            {book.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatKES(book.originalPrice)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full w-10 h-10 shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(book);
            }}
            disabled={!book.inStock}
            aria-label={`Add ${book.title} to cart`}
            data-testid={`button-add-to-cart-${book.id}`}
          >
            <ShoppingBag className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
});
