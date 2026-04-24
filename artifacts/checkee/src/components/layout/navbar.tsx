import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone, MapPin, Search, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import logoPng from "@/assets/logo.png";

const products = [
  { href: "/trace", label: "Trace", desc: "Truy xuất nguồn gốc", icon: "🌱" },
  { href: "/e-label", label: "E-label", desc: "Nhãn điện tử", icon: "📱" },
  { href: "/dpp", label: "DPP", desc: "Hộ chiếu sản phẩm số EU", icon: "🛂" },
  { href: "/fnb", label: "F&B", desc: "Mẫu thử thực phẩm", icon: "🍱" },
];

const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("vi");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";
  const isTransparent = isHome && !scrolled;

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductOpen(false), 150);
  };

  const openLang = () => {
    if (langTimer.current) clearTimeout(langTimer.current);
    setLangOpen(true);
  };
  const scheduleLangClose = () => {
    if (langTimer.current) clearTimeout(langTimer.current);
    langTimer.current = setTimeout(() => setLangOpen(false), 150);
  };

  const isProductActive = products.some((p) => p.href === location);
  const currentLang = languages.find((l) => l.code === activeLang) ?? languages[0];

  const linkClass = (active: boolean) => {
    const base =
      "transition-colors duration-300 text-[13px] font-semibold uppercase tracking-[0.08em]";
    if (isTransparent) {
      return `${base} ${
        active
          ? "text-[#F2A65A] relative after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#F2A65A]"
          : "text-white/90 hover:text-white"
      }`;
    }
    return `${base} ${
      active
        ? "text-[#1A6B52] relative after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#1A6B52]"
        : "text-[#0F1B2D] hover:text-[#1A6B52]"
    }`;
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Top utility bar */}
      <div
        className={`hidden lg:block transition-all duration-300 border-b ${
          isTransparent
            ? "bg-transparent border-white/10 text-white/70"
            : "bg-[#FAF6F0] border-[#E5EAF0] text-[#4A5868]"
        }`}
      >
        <div className="container max-w-[1440px] mx-auto px-6 md:px-10 h-9 flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              65 Nguyễn Huệ, Quận 1, TP.HCM
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Hotline: 1900 1234
            </span>
          </div>

          {/* Language switcher */}
          <div
            className="relative"
            onMouseEnter={openLang}
            onMouseLeave={scheduleLangClose}
          >
            <button
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border transition-colors ${
                isTransparent
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-[#E5EAF0] bg-white text-[#0F1B2D] hover:border-[#0B4F6C]"
              }`}
              onClick={() => setLangOpen((v) => !v)}
            >
              <span>{currentLang.flag}</span>
              <span className="font-semibold">{currentLang.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute right-0 top-full pt-2 transition-all duration-200 ${
                langOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
              }`}
            >
              <div className="bg-white border border-[#E5EAF0] rounded-lg shadow-xl overflow-hidden min-w-[160px]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setActiveLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[13px] hover:bg-[#FAFBFC] flex items-center gap-2 ${
                      l.code === activeLang ? "text-[#1A6B52] font-semibold bg-[#F0F8F4]" : "text-[#0F1B2D]"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={`transition-all duration-300 ${
          isTransparent ? "bg-transparent" : "bg-white shadow-sm"
        }`}
      >
        <div className="container flex items-center justify-between px-6 md:px-10 max-w-[1440px] mx-auto h-[72px] lg:h-[80px]">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={logoPng}
              alt="Checkee"
              className={`h-9 md:h-10 object-contain transition-all ${
                isTransparent ? "brightness-0 invert" : ""
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            <Link href="/" className={linkClass(location === "/")}>
              Trang chủ
            </Link>

            {/* Products dropdown */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
            >
              <button
                className={`flex items-center gap-1.5 ${linkClass(isProductActive)}`}
                onClick={() => setProductOpen((v) => !v)}
              >
                Giải pháp
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${productOpen ? "rotate-180" : ""}`}
                />
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
                        <div className="text-[#0F1B2D] text-[15px] font-semibold group-hover:text-[#1A6B52] transition-colors">
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

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              aria-label="Tìm kiếm"
              className={`p-2 rounded-full transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#0F1B2D] hover:bg-[#FAFBFC]"
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/login"
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#0F1B2D] hover:bg-[#FAFBFC]"
              }`}
            >
              <User className="w-4 h-4" />
              Đăng nhập
            </Link>

            <CtaButton href="/demo">Dùng thử miễn phí</CtaButton>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 ${isTransparent ? "text-white" : "text-[#0F1B2D]"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="h-6 w-6 stroke-[1.5]" /> : <Menu className="h-6 w-6 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E5EAF0] shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[90vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-1 text-[15px] font-medium">
          <Link
            href="/"
            className="py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Trang chủ
          </Link>
          <button
            className="flex items-center justify-between py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold"
            onClick={() => setMobileProductOpen((v) => !v)}
          >
            <span>Giải pháp</span>
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
          <Link
            href="/pricing"
            className="py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Bảng giá
          </Link>
          <Link
            href="/blog"
            className="py-3 text-[#4A5868] hover:text-[#0F1B2D] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Tin tức
          </Link>
          <Link
            href="/contact"
            className="py-3 text-[#4A5868] hover:text-[#0F1B2D] uppercase tracking-wide text-[13px] font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Liên hệ
          </Link>

          <div className="pt-4 border-t border-[#E5EAF0] space-y-3">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 py-3 border border-[#E5EAF0] rounded-full text-[#0F1B2D] uppercase tracking-wide text-[13px] font-semibold"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" /> Đăng nhập
            </Link>
            <CtaButton href="/demo" className="w-full justify-center">
              Dùng thử miễn phí
            </CtaButton>
            {/* Mobile language switcher */}
            <div className="flex gap-2 pt-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setActiveLang(l.code)}
                  className={`flex-1 py-2 rounded-md border text-[13px] inline-flex items-center justify-center gap-1.5 ${
                    l.code === activeLang
                      ? "border-[#1A6B52] bg-[#F0F8F4] text-[#1A6B52] font-semibold"
                      : "border-[#E5EAF0] text-[#4A5868]"
                  }`}
                >
                  <span>{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
