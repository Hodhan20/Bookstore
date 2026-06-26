import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { books, CATEGORIES } from "@/data/books";
import { BookGrid } from "@/components/books/BookGrid";
import { ShopSkeleton } from "@/components/ui/skeleton-loader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Shop() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "All";

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const allCategories = ["All", ...Object.keys(CATEGORIES)];

  const subcategories: string[] = useMemo(() => {
    if (selectedCategory === "All") return [];
    return CATEGORIES[selectedCategory] ?? [];
  }, [selectedCategory]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubcategory("All");
  };

  const filteredAndSortedBooks = useMemo(() => {
    let result = [...books];

    if (selectedCategory !== "All") {
      result = result.filter(b => b.category === selectedCategory);
    }

    if (selectedSubcategory !== "All") {
      result = result.filter(b => b.subcategory === selectedSubcategory);
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        result.sort((a, b) => {
          if (a.badge === "New Arrival" && b.badge !== "New Arrival") return -1;
          if (a.badge !== "New Arrival" && b.badge === "New Arrival") return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [selectedCategory, selectedSubcategory, searchTerm, sortBy]);

  if (loading) return <ShopSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-border pb-6">
        <div className="w-full md:w-auto mb-6 md:mb-0">
          <h1 className="font-serif text-4xl font-bold mb-2">The Collection</h1>
          <p className="text-muted-foreground">
            Discover your next great read from our curated catalog.
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search books, authors..."
              className="pl-9"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              data-testid="input-search"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">New Arrivals</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <h3 className="font-serif font-bold text-lg">Categories</h3>
            </div>

            {/* Main categories */}
            <ul className="space-y-1">
              {allCategories.map(cat => (
                <li key={cat}>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    onClick={() => handleCategorySelect(cat)}
                    data-testid={`button-category-${cat}`}
                  >
                    {cat}
                    {CATEGORIES[cat]?.length > 0 && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          selectedCategory === cat ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Subcategories — shown when parent is active */}
                  <AnimatePresence>
                    {selectedCategory === cat && subcategories.length > 0 && (
                      <motion.ul
                        key="subs"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-1 ml-3 border-l-2 border-primary/20 pl-3 space-y-1"
                      >
                        <li>
                          <button
                            className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                              selectedSubcategory === "All"
                                ? "text-primary font-semibold"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => setSelectedSubcategory("All")}
                            data-testid="button-subcategory-all"
                          >
                            All {cat}
                          </button>
                        </li>
                        {subcategories.map(sub => (
                          <li key={sub}>
                            <button
                              className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                                selectedSubcategory === sub
                                  ? "text-primary font-semibold"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                              onClick={() => setSelectedSubcategory(sub)}
                              data-testid={`button-subcategory-${sub}`}
                            >
                              {sub}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {filteredAndSortedBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Search className="w-12 h-12 text-muted-foreground/40 mb-4" />
              <h3 className="font-serif text-xl font-semibold mb-2">No books found</h3>
              <p className="text-muted-foreground text-sm">
                Try a different category, subcategory, or search term.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {filteredAndSortedBooks.length} book{filteredAndSortedBooks.length !== 1 ? "s" : ""} found
                {selectedCategory !== "All" && (
                  <span>
                    {" "}in <span className="text-primary font-medium">{selectedCategory}</span>
                    {selectedSubcategory !== "All" && (
                      <span> &rsaquo; <span className="text-primary font-medium">{selectedSubcategory}</span></span>
                    )}
                  </span>
                )}
              </p>
              <BookGrid books={filteredAndSortedBooks} />
            </>
          )}
        </main>
      </div>
    </motion.div>
  );
}
