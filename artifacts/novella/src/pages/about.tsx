import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PageSkeleton } from "@/components/ui/skeleton-loader";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="p-12 text-center">Loading About...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16"
    >
      <div className="bg-card py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-muted-foreground">
            Novella was born out of a simple belief: that the right book at the right time can change a life. We are a sanctuary for bibliophiles.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80" className="rounded-lg shadow-xl w-full object-cover" alt="Bookstore shelves" />
        </div>
        <div className="space-y-6">
          <h2 className="font-serif text-3xl font-bold">A Haven for Readers</h2>
          <p className="text-muted-foreground">
            Founded in 2024, Novella provides an expertly curated selection of literature. We don't just sell books; we connect readers with stories that resonate. Our cozy aesthetic is designed to feel like a second home.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-sm font-medium">Books Available</div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm font-medium">Happy Readers</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}