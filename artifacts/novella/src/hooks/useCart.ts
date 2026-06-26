import { useLocalStorage } from "./useLocalStorage";
import { CartItem } from "@/context/CartContext";
import { Book } from "@/data/books";
import { toast } from "sonner";
import { useMemo } from "react";

export function useCartState() {
  const [items, setItems] = useLocalStorage<CartItem[]>("novella-cart", []);

  const addToCart = (book: Book) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.book.id === book.id);
      if (existingItem) {
        toast.success(`Increased quantity of ${book.title}`);
        return currentItems.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`Added ${book.title} to cart`);
      return [...currentItems, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.book.id !== bookId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (bookId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(bookId);
      return;
    }
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.book.id === bookId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
}
