import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-primary">Novella</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Where Stories Find Readers. Read. Imagine. Explore. A premium curated collection for every kind of reader.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary text-sm transition-colors">Shop</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-foreground">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=Fiction" className="text-muted-foreground hover:text-primary text-sm transition-colors">Fiction</Link>
              </li>
              <li>
                <Link href="/shop?category=Non-Fiction" className="text-muted-foreground hover:text-primary text-sm transition-colors">Non-Fiction</Link>
              </li>
              <li>
                <Link href="/shop?category=Children" className="text-muted-foreground hover:text-primary text-sm transition-colors">Children's Books</Link>
              </li>
              <li>
                <Link href="/shop?category=Cookbooks" className="text-muted-foreground hover:text-primary text-sm transition-colors">Cookbooks</Link>
              </li>
              <li>
                <Link href="/shop?category=Comics" className="text-muted-foreground hover:text-primary text-sm transition-colors">Comics</Link>
              </li>
              <li>
                <Link href="/shop?category=Magazines" className="text-muted-foreground hover:text-primary text-sm transition-colors">Magazines</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-foreground">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Digo Road,<br />
                  Mombasa,<br />
                  Kenya
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-muted-foreground text-sm">0112090878</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-muted-foreground text-sm">abdullahihodhan20@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Novella Bookstore. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
