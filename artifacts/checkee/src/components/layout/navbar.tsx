import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import logoPng from "@/assets/logo.png";

const products = [
  { href: "/trace", label: "Trace", desc: "Truy xuất nguồn gốc", icon: "🌱" },
  { href: "/e-label", label: "E-label", desc: "Nhãn điện tử", icon: "📱" },
  { href: "/dpp", label: "DPP", desc: "Hộ chiếu sản phẩm số EU", icon: "🛂" },
  { href: "/fnb", label: "F&B", desc: "Mẫu thử thực phẩm", icon: "🍱" },
  { href: "/tem-phu", label: "Tem phụ", desc: "Tem phụ hàng nhập khẩu", icon: "🏷️" },
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
    `transition-colors duration-300 text-[14px] md:text-[15px] font-medium ${active ? "text-[#1A7EA4] relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-[#1A7EA4] after:w-full" : "text-[#0F1B2D] hover:text-[#1A7EA4] link-hover"}`;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 bg-white ${
        scrolled ? "h-16 shadow-sm" : "h-[72px]"
      }`}
    >
      <div className="container flex h-full items-center justify-between px-6 md:px-10 max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center shrink-0">
          <img src={logoPng} alt="Checkee" className="h-8 md:h-9 object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          <Link href="/" className={linkClass(location === "/")}>
            Trang chủ
          </Link>

          {/* Products dropdown */}
          <div className="relative h-full flex items-center" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
            <button
              className={`flex items-center gap-1.5 ${linkClass(isProductActive)}`}
              onClick={() => setProductOpen((v) => !v)}
            >
              Sản phẩm
              <ChevronDown className={`w-4 h-4 transition-transform ${productOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ${
                productOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}
            >
              <div className="bg-white border border-[#E5EAF0] rounded-xl shadow-xl p-3 w-[340px]">
                {products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#FAFBFC] transition-colors group"
                    onClick={() => setProductOpen(false)}
                  >
                    <div className="text-2xl mt-1">{p.icon}</div>
                    <div>
                      <div className="text-[#0F1B2D] text-[15px] font-semibold group-hover:text-[#1A7EA4] transition-colors">
                        Checkee {p.label}
                      </div>
                      <div className="text-[#4A5868] text-[13px] mt-0.5">{p.desc}</div>
                    </div>
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
          <Link href="/contact" className={linkClass(location === "/contact")}>
            Liên hệ
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-[#7D9E94] text-[13px] font-medium">
            <Phone className="w-4 h-4" />
            <span>Hotline: 1900 1234</span>
          </div>
          <CtaButton href="/demo">Dùng thử miễn phí</CtaButton>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[#0F1B2D]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6 stroke-[1.5]" /> : <Menu className="h-6 w-6 stroke-[1.5]" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E5EAF0] shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-1 text-[15px] font-medium">
          <Link
            href="/"
            className="py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC]"
            onClick={() => setIsOpen(false)}
          >
            Trang chủ
          </Link>
          <button
            className="flex items-center justify-between py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC]"
            onClick={() => setMobileProductOpen((v) => !v)}
          >
            <span>Sản phẩm</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileProductOpen && (
            <div className="bg-[#FAFBFC] rounded-lg p-2 my-2 space-y-1">
              {products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-3 p-3 text-[#4A5868] hover:text-[#0F1B2D] hover:bg-white rounded-md"
                  onClick={() => {
                    setIsOpen(false);
                    setMobileProductOpen(false);
                  }}
                >
                  <span>{p.icon}</span>
                  <span className="font-semibold">Checkee {p.label}</span>
                </Link>
              ))}
            </div>
          )}
          <Link href="/pricing" className="py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC]" onClick={() => setIsOpen(false)}>
            Bảng giá
          </Link>
          <Link href="/blog" className="py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC]" onClick={() => setIsOpen(false)}>
            Tin tức
          </Link>
          <Link href="/contact" className="py-3 text-[#4A5868] hover:text-[#0F1B2D]" onClick={() => setIsOpen(false)}>
            Liên hệ
          </Link>
          <div className="pt-6">
            <CtaButton href="/demo" className="w-full justify-center">
              Dùng thử miễn phí
            </CtaButton>
          </div>
        </nav>
      </div>
    </header>
  );
}