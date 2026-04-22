import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
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
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'bg-[#060B25] border-b border-white/10 py-0 h-16' : 'bg-transparent py-2 h-[72px]'}`}>
      <div className="container flex h-full items-center justify-between px-6 md:px-12 max-w-[1400px] mx-auto">
        <Link href="/" className="flex items-center">
          <img src={logoPng} alt="Checkee Logo" className="h-8 md:h-10 object-contain invert brightness-0" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-[13px] font-normal tracking-wide uppercase">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-300 hover:text-white ${
                location === link.href ? "text-white" : "text-[#B8B5AE]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-8">
          <button className="text-[#B8B5AE] hover:text-white transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <Link href="#" className="text-[13px] font-normal tracking-wide uppercase text-[#B8B5AE] hover:text-white transition-colors">
            Yêu thích
          </Link>
          <Link href="/contact">
            <Button className="rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white transition-all duration-300 uppercase text-[11px] tracking-[0.15em] px-5 py-2 h-auto">
              Liên hệ tư vấn
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6 stroke-[1.5]" /> : <Menu className="h-6 w-6 stroke-[1.5]" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#060B25] border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col p-6 space-y-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-normal uppercase tracking-wide text-[#B8B5AE] hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white uppercase text-[11px] tracking-[0.15em] h-12">
                Liên hệ tư vấn
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}