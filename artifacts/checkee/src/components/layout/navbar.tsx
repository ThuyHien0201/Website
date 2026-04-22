import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logoPng from "@/assets/logo.png";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/trace", label: "Trace" },
    { href: "/e-label", label: "E-label" },
    { href: "/dpp", label: "DPP" },
    { href: "/fnb", label: "F&B" },
    { href: "/tem-phu", label: "Tem phụ" },
    { href: "/pricing", label: "Bảng giá" },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/50 py-2' : 'bg-transparent py-4'}`}>
      <div className="container flex h-16 items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <img src={logoPng} alt="Checkee Logo" className="h-8 md:h-10 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 text-[13px] font-medium tracking-wide uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-300 hover:text-accent relative after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-accent after:transition-all after:duration-300 ${
                location === link.href ? "text-foreground after:w-full" : "text-muted-foreground after:w-0 hover:after:w-full"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/demo" className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors">
            Thử miễn phí
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="rounded-none border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-500 tracking-wider uppercase text-xs px-6 h-12">
              Liên hệ
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 stroke-[1.5]" /> : <Menu className="h-6 w-6 stroke-[1.5]" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-background border-b transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col p-6 space-y-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 border-t flex flex-col space-y-4">
            <Link href="/demo" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start rounded-none tracking-wider uppercase text-xs h-12">Thử miễn phí</Button>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90 tracking-wider uppercase text-xs h-12">Liên hệ</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
