import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/trace", label: "Trace" },
    { href: "/e-label", label: "E-label" },
    { href: "/dpp", label: "DPP" },
    { href: "/fnb", label: "F&B" },
    { href: "/tem-phu", label: "Tem phụ" },
    { href: "/pricing", label: "Bảng giá" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-1">
          <span className="font-serif text-2xl font-bold text-primary">Check<span className="text-foreground">ee</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-primary ${
                location === link.href ? "text-primary" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/demo">
            <Button variant="ghost">Demo</Button>
          </Link>
          <Link href="/contact">
            <Button>Liên hệ</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-b bg-background">
          <nav className="flex flex-col p-4 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/demo" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">Demo</Button>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Liên hệ</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
