import { Switch, Route, Router as WouterRouter } from "wouter";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { CartContext } from "./context/CartContext";
import { useCartState } from "./hooks/useCart";
import { Layout } from "./components/layout/Layout";
import { HomeSkeleton, ShopSkeleton } from "./components/ui/skeleton-loader";

// Lazy load pages for performance
const Home = lazy(() => import("./pages/home"));
const Shop = lazy(() => import("./pages/shop"));
const BookDetails = lazy(() => import("./pages/book-details"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const OrderConfirmation = lazy(() => import("./pages/order-confirmation"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const NotFound = lazy(() => import("./pages/not-found"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-background"><HomeSkeleton /></div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/book/:id" component={BookDetails} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/order-confirmation" component={OrderConfirmation} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const cartState = useCartState();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartContext.Provider value={cartState}>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Layout>
              <Router />
            </Layout>
          </WouterRouter>
          <Toaster richColors position="top-center" />
        </CartContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
