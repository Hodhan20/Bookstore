import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Truck, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookGrid } from "@/components/books/BookGrid";
import { books } from "@/data/books";
import { HomeSkeleton } from "@/components/ui/skeleton-loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  const featuredBooks = books.filter(b => b.badge === "Bestseller").slice(0, 4);
  const newArrivals = books.filter(b => b.badge === "New Arrival").slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center bg-card">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=80"
            alt="Bookstore interior with warm lighting"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-4">
                Read. Imagine. Explore.
              </p>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Where Stories <br />
                <span className="text-primary italic">Find Readers</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                Discover a carefully curated collection of fiction, non-fiction, and everything in between at your premium independent bookshop.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-md px-8 rounded-full" data-testid="button-explore">
                  <Link href="/shop">Explore Collection</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-md px-8 rounded-full border-primary text-primary hover:bg-primary/10" data-testid="button-our-story">
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Curated Selection</h3>
              <p className="text-sm text-muted-foreground">Handpicked books from around the world.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Nationwide delivery within 48 hours.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Safe and encrypted payment gateways.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Made with Love</h3>
              <p className="text-sm text-muted-foreground">Passionate booksellers at your service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">Bestsellers</h2>
              <p className="text-muted-foreground">Our most beloved reads this month.</p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              data-testid="link-view-all-bestsellers"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <BookGrid books={featuredBooks} />
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/shop">View All Bestsellers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh off the press to your bookshelf.</p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
              data-testid="link-view-all-arrivals"
            >
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <BookGrid books={newArrivals} />
        </div>
      </section>
    </motion.div>
  );
}
