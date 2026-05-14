import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/context/auth-context";
import { LoginModal } from "@/components/auth/login-modal";
import { PricingModal } from "@/components/auth/pricing-modal";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Trace from "@/pages/trace";
import ELabel from "@/pages/e-label";
import DPP from "@/pages/dpp";
import FNB from "@/pages/fnb";
import Pricing from "@/pages/pricing";
import Demo from "@/pages/demo";
import DemoPreview from "@/pages/demo-preview";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Blog from "@/pages/blog";
import Checkout from "@/pages/checkout";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Switch>
        <Route path="/demo/preview/:type" component={DemoPreview} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/admin" component={Admin} />
        <Route>
          <Navbar />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/trace" component={Trace} />
              <Route path="/e-label" component={ELabel} />
              <Route path="/dpp" component={DPP} />
              <Route path="/fnb" component={FNB} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/demo" component={Demo} />
              <Route path="/contact" component={Contact} />
              <Route path="/about" component={About} />
              <Route path="/blog" component={Blog} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Route>
      </Switch>
      <LoginModal />
      <PricingModal />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
