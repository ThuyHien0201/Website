import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, LayoutDashboard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { CtaButton } from "@/components/ui/cta-button";
import { TrialButton } from "@/components/ui/trial-button";
import { useAuth } from "@/context/auth-context";
import logoPng from "@/assets/logo.png";

const products = [
  { href: "/trace", label: "Trace", desc: "Truy xuất nguồn gốc", icon: "🌱" },
  { href: "/e-label", label: "E-label", desc: "Nhãn điện tử", icon: "📱" },
  { href: "/dpp", label: "DPP", desc: "Hộ chiếu sản phẩm số EU", icon: "🛂" },
  { href: "/fnb", label: "F&B", desc: "Mẫu thử thực phẩm", icon: "🍱" },
];

const languages = [
  { code: "vi", label: "Tiếng Việt", flagSrc: "https://flagcdn.com/w40/vn.png" },
  { code: "en", label: "English", flagSrc: "https://flagcdn.com/w40/gb.png" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("vi");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const avatarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { user, logout, openLoginModal } = useAuth();

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductOpen(false), 150);
  };
  const openAvatar = () => {
    if (avatarTimer.current) clearTimeout(avatarTimer.current);
    setAvatarOpen(true);
  };
  const closeAvatar = () => {
    if (avatarTimer.current) clearTimeout(avatarTimer.current);
    avatarTimer.current = setTimeout(() => setAvatarOpen(false), 150);
  };

  const isProductActive = products.some((p) => p.href === location);
  const initials = user ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "";

  const linkClass = (active: boolean) => {
    const base = "transition-colors duration-200 text-[13px] font-semibold uppercase tracking-[0.08em]";
    return `${base} ${active
      ? "text-[#0c964b] relative after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0c964b]"
      : "text-[#0F1B2D] hover:text-[#0c964b]"}`;
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm border-b border-[#E5EAF0]">
      <div className="container mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex items-center justify-between h-[72px] lg:h-[80px]">

          {/* Logo — always shows in original color */}
          <Link href="/" className="flex items-center shrink-0 mr-10">
            <img src={logoPng} alt="Checkee" className="h-9 md:h-10 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1">
            <Link href="/" className={linkClass(location === "/")}>Trang chủ</Link>

            <div className="relative h-full flex items-center" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
              <button className={`flex items-center gap-1.5 ${linkClass(isProductActive)}`} onClick={() => setProductOpen(v => !v)}>
                Giải pháp
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ${productOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                <div className="bg-white border border-[#E5EAF0] rounded-xl shadow-xl p-3 w-[340px]">
                  {products.map(p => (
                    <Link key={p.href} href={p.href}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#f0fdf4] transition-colors group"
                      onClick={() => setProductOpen(false)}>
                      <div className="text-2xl mt-1">{p.icon}</div>
                      <div>
                        <div className="text-[#0F1B2D] text-[15px] font-semibold group-hover:text-[#0c964b] transition-colors">Checkee {p.label}</div>
                        <div className="text-[#4A5868] text-[13px] mt-0.5">{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/pricing" className={linkClass(location === "/pricing")}>Bảng giá</Link>
            <Link href="/blog" className={linkClass(location === "/blog")}>Tin tức</Link>
            <Link href="/contact" className={linkClass(location === "/contact")}>Liên hệ</Link>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {user ? (
              <div className="relative" onMouseEnter={openAvatar} onMouseLeave={closeAvatar}>
                <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-[#f0fdf4] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#0c964b] text-white flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-[13px] font-semibold text-[#0F1B2D]">{user.name.split(" ").pop()}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#7D9E94] transition-transform ${avatarOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute right-0 top-full pt-2 transition-all duration-200 ${avatarOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                  <div className="bg-white border border-[#E5EAF0] rounded-xl shadow-xl p-2 w-[200px]">
                    <div className="px-3 py-2 border-b border-[#E5EAF0] mb-1">
                      <p className="text-sm font-semibold text-[#0F1B2D]">{user.name}</p>
                      <p className="text-xs text-[#7D9E94]">{user.phone || user.email}</p>
                    </div>
                    <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#f0fdf4] text-[#0F1B2D] text-sm font-semibold" onClick={() => setAvatarOpen(false)}>
                      <LayoutDashboard className="w-4 h-4 text-[#0c964b]" />
                      Dashboard
                    </Link>
                    <button onClick={() => { logout(); setAvatarOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 text-red-500 text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => openLoginModal()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0F1B2D] hover:bg-[#f0fdf4] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                Đăng nhập
              </button>
            )}

            <TrialButton />

            {/* Language switcher */}
            <div className="relative ml-1">
              <button onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-[#E5EAF0] bg-white text-[#0F1B2D] hover:border-[#0c964b] transition-colors">
                <img src={languages.find(l => l.code === activeLang)?.flagSrc} alt="lang" className="w-5 h-5 rounded-full object-cover" />
                <ChevronDown className="w-3.5 h-3.5 text-[#7D9E94]" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg overflow-hidden z-50 bg-white border border-[#E5EAF0]">
                  {languages.map(l => (
                    <button key={l.code} onClick={() => { setActiveLang(l.code); setIsLangOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all ${activeLang === l.code ? "bg-[#f0fdf4] text-[#0c964b] font-semibold" : "text-[#0F1B2D] hover:bg-[#f0fdf4]"}`}>
                      <img src={l.flagSrc} alt={l.label} className="w-5 h-5 rounded-full object-cover" />
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 rounded-xl text-[#0F1B2D] hover:bg-[#f0fdf4]" onClick={() => setIsOpen(v => !v)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-[#E5EAF0] shadow-lg transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[90vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col p-6 space-y-1 text-[15px] font-medium">
          <Link href="/" className="py-3 text-[#4A5868] hover:text-[#0c964b] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold" onClick={() => setIsOpen(false)}>Trang chủ</Link>
          <button className="flex items-center justify-between py-3 text-[#4A5868] hover:text-[#0c964b] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold" onClick={() => setMobileProductOpen(v => !v)}>
            <span>Giải pháp</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileProductOpen && (
            <div className="bg-[#FAFBFC] rounded-lg p-2 my-2 space-y-1">
              {products.map(p => (
                <Link key={p.href} href={p.href} className="flex items-center gap-3 p-3 text-[#4A5868] hover:text-[#0c964b] hover:bg-[#f0fdf4] rounded-md" onClick={() => { setIsOpen(false); setMobileProductOpen(false); }}>
                  <span>{p.icon}</span>
                  <span className="font-semibold">Checkee {p.label}</span>
                </Link>
              ))}
            </div>
          )}
          <Link href="/pricing" className="py-3 text-[#4A5868] hover:text-[#0c964b] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold" onClick={() => setIsOpen(false)}>Bảng giá</Link>
          <Link href="/blog" className="py-3 text-[#4A5868] hover:text-[#0c964b] border-b border-[#FAFBFC] uppercase tracking-wide text-[13px] font-semibold" onClick={() => setIsOpen(false)}>Tin tức</Link>
          <Link href="/contact" className="py-3 text-[#4A5868] hover:text-[#0c964b] uppercase tracking-wide text-[13px] font-semibold" onClick={() => setIsOpen(false)}>Liên hệ</Link>
          <div className="pt-4 border-t border-[#E5EAF0] space-y-3">
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center justify-center gap-2 py-3 border border-[#E5EAF0] rounded-full text-[#0F1B2D] uppercase tracking-wide text-[13px] font-semibold" onClick={() => setIsOpen(false)}>
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full flex items-center justify-center gap-2 py-3 border border-red-100 rounded-full text-red-500 uppercase tracking-wide text-[13px] font-semibold">Đăng xuất</button>
              </>
            ) : (
              <button onClick={() => { openLoginModal(); setIsOpen(false); }} className="w-full flex items-center justify-center gap-2 py-3 border border-[#E5EAF0] rounded-full text-[#0F1B2D] uppercase tracking-wide text-[13px] font-semibold">Đăng nhập</button>
            )}
            <TrialButton className="w-full justify-center" />
            <div className="flex justify-center gap-3 pt-2">
              {languages.map(l => (
                <button key={l.code} onClick={() => setActiveLang(l.code)} aria-label={l.label}
                  className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${activeLang === l.code ? "border-[#0c964b] scale-110 shadow" : "border-[#E5EAF0] opacity-70"}`}>
                  <img src={l.flagSrc} alt={l.label} className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
