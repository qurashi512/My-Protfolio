import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";                              // ← أضف هذا
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Certifications from "@/pages/Certifications";
import TestimonialsPage from "@/pages/TestimonialsPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// ← مكوّن جديد يرجع للأعلى عند كل تنقل
function ScrollReset() {
  const [location] = useLocation();
  const prevRef = useRef<string>("");

  useEffect(() => {
    const prev = prevRef.current;
    prevRef.current = location;

    if (location === "/") {
      // رجوع للصفحة الرئيسية → استعد الموضع المحفوظ
      const saved = sessionStorage.getItem("home-scroll");
      if (saved && prev !== "") {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(saved), behavior: "instant" });
        }, 80);
        return;
      }
    }

    if (prev === "/") {
      // مغادرة الصفحة الرئيسية → احفظ الموضع الحالي
      sessionStorage.setItem("home-scroll", String(window.scrollY));
    }

    // باقي الصفحات → ابدأ من الأعلى
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollReset />                          {/* ← أضفه هنا */}
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/certifications" component={Certifications} />
        <Route path="/testimonials" component={TestimonialsPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <ScrollToTop />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollProgressBar />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
