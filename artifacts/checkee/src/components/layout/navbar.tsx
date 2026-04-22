import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import logoPng from "@/assets/logo.png";

const products = [
  { href: "/trace", label: "Trace", desc: "Truy xuất nguồn gốc" },
  { href: "/e-label", label: "E-label", desc: "Nhãn điện tử" },
  { href: "/dpp", label: "DPP", desc: "Hộ chiếu sản phẩm số EU" },
  { href: "/fnb", label: "F&B", desc: "Mẫu thử thực phẩm" },
  { href: "/tem-phu", label: "Tem phụ", desc: "Tem phụ hàng nhập khẩu" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductOpen(false), 150);
  };

  const isProductActive = products.some((p) => p.href === location);

  const linkClass = (active: boolean) =>
    `transition-colors duration-300 hover:text-white ${active ? "text-white" : "text-white/70"}`;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#0A1340]/95 backdrop-blur-md border-b border-white/10 h-16"
          : "bg-transparent h-[76px]"
      }`}
    >
      <div className="container flex h-full items-center justify-between px-6 md:px-10 max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center shrink-0">
          <img src={logoPng} alt="Checkee" className="h-8 md:h-9 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-9 text-[13px] font-medium tracking-wide">
          <Link href="/" className={linkClass(location === "/")}>
            Trang chủ
          </Link>

          {/* Products dropdown */}
          <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
            <button
              className={`flex items-center gap-1.5 ${linkClass(isProductActive)}`}
              onClick={() => setProductOpen((v) => !v)}
            >
              Sản phẩm
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ${
                productOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div className="bg-[#0A1340] border border-white/10 rounded-xl shadow-2xl shadow-black/40 p-2 w-[320px]">
                {products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="flex flex-col px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                    onClick={() => setProductOpen(false)}
                  >
                    <span className="text-white text-[14px] font-medium group-hover:text-[#FF8A3D] transition-colors">
                      Checkee {p.label}
                    </span>
                    <span className="text-white/60 text-[12px] mt-0.5">{p.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/pricing" className={linkClass(location === "/pricing")}>
            Bảng giá
          </Link>
          <Link href="/blog" className={linkClass(location === "/blog")}>
            Tin tức
          </Link>
          <Link href="/demo" className={linkClass(location === "/demo")}>
            Dùng thử miễn phí
          </Link>
          <Link href="/contact" className={linkClass(location === "/contact")}>
            Liên hệ
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/demo">
            <Button className="rounded-full bg-gradient-to-r from-[#FF6B47] to-[#FF8A3D] hover:opacity-90 text-white font-medium text-[13px] px-6 py-2.5 h-auto shadow-lg shadow-[#FF6B47]/20">
              Dùng thử miễn phí
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6 stroke-[1.5]" /> : <Menu className="h-6 w-6 stroke-[1.5]" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0A1340] border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-1 text-[15px]">
          <Link
            href="/"
            className="py-3 text-white/80 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Trang chủ
          </Link>
          <button
            className="flex items-center justify-between py-3 text-white/80 hover:text-white"
            onClick={() => setMobileProductOpen((v) => !v)}
          >
            <span>Sản phẩm</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileProductOpen && (
            <div className="pl-4 border-l border-white/10 space-y-1">
              {products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block py-2.5 text-white/70 hover:text-white text-[14px]"
                  onClick={() => {
                    setIsOpen(false);
                    setMobileProductOpen(false);
                  }}
                >
                  Checkee {p.label}
                </Link>
              ))}
            </div>
          )}
          <Link href="/pricing" className="py-3 text-white/80 hover:text-white" onClick={() => setIsOpen(false)}>
            Bảng giá
          </Link>
          <Link href="/blog" className="py-3 text-white/80 hover:text-white" onClick={() => setIsOpen(false)}>
            Tin tức
          </Link>
          <Link href="/contact" className="py-3 text-white/80 hover:text-white" onClick={() => setIsOpen(false)}>
            Liên hệ
          </Link>
          <div className="pt-4">
            <Link href="/demo" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full bg-gradient-to-r from-[#FF6B47] to-[#FF8A3D] text-white font-medium h-12">
                Dùng thử miễn phí
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
