import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutGrid, Users, Megaphone, Eye, EyeOff, Loader2, LogOut,
  Plus, Trash2, CheckCircle2, XCircle, Clock, ChevronDown, ChevronRight,
  FileText, Image, Newspaper, Settings2, Shield, QrCode, Package, Calendar,
  AlertTriangle, Edit3, Save, X, Activity, TrendingUp, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth-context";
import logoPng from "@/assets/logo.png";

const ADMIN_EMAIL = "admin@checkee.vn";
const ADMIN_PASSWORD = "Admin@2026";

type AdminTab = "marketing" | "customers" | "journey";
type MarketingSection = "content" | "news" | "images";

type NewsArticle = { id: string; title: string; summary: string; date: string; published: boolean };

const INITIAL_NEWS: NewsArticle[] = [
  { id: "n1", title: "Checkee ra mắt tính năng DPP cho thị trường EU", summary: "Nền tảng Checkee chính thức hỗ trợ Digital Product Passport giúp doanh nghiệp Việt tiếp cận thị trường châu Âu.", date: "10/05/2026", published: true },
  { id: "n2", title: "Hội thảo truy xuất nguồn gốc 2026 tại Hà Nội", summary: "Checkee đồng hành cùng Bộ Nông nghiệp trong hội thảo số hóa chuỗi cung ứng thực phẩm.", date: "25/04/2026", published: true },
  { id: "n3", title: "Cập nhật giao diện ứng dụng v2.5", summary: "Phiên bản mới mang đến trải nghiệm tốt hơn với dashboard được thiết kế lại hoàn toàn.", date: "01/04/2026", published: false },
];

const SECTION_TOGGLES = [
  { key: "hero", label: "Hero Section" },
  { key: "solutions", label: "Giải pháp" },
  { key: "pricing", label: "Bảng giá" },
  { key: "testimonials", label: "Đánh giá khách hàng" },
  { key: "faq", label: "Câu hỏi thường gặp" },
  { key: "cta", label: "CTA cuối trang" },
];

const JOURNEY_EVENT_COLORS: Record<string, string> = {
  clicked_trial: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  completed_step1: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  completed_step2: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  completed_step3: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  generated_qr: "bg-[#D4EDE6] text-[#1A5C3A] border-[#B8E0D2]",
  selected_plan: "bg-[#fef3e2] text-[#ed8302] border-[#fdba74]",
  clicked_download_qr: "bg-[#fef3e2] text-[#ed8302] border-[#fdba74]",
  clicked_print_qr: "bg-[#fef3e2] text-[#ed8302] border-[#fdba74]",
};

const FUNNEL_STEPS = [
  { key: "clicked_trial", label: "Bấm Dùng thử" },
  { key: "completed_step1", label: "Bước 1: Doanh nghiệp" },
  { key: "completed_step2", label: "Bước 2: Sản phẩm" },
  { key: "completed_step3", label: "Bước 3: Hành trình" },
  { key: "generated_qr", label: "Tạo mã QR" },
  { key: "selected_plan", label: "Chọn gói" },
];

export default function Admin() {
  const [, navigate] = useLocation();
  const { adminCustomers, adminVerifyCustomerCert, userCerts, adminVerifyCert, user: authUser, journeyEvents } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState<AdminTab>("marketing");
  const [marketingSection, setMarketingSection] = useState<MarketingSection>("content");

  const [heroTitle, setHeroTitle] = useState("Minh bạch chuỗi cung ứng, nâng tầm thương hiệu Việt.");
  const [heroSubtitle, setHeroSubtitle] = useState("Checkee phát triển nền tảng số phục vụ quản lý, định danh và truy xuất nguồn gốc sản phẩm hàng hoá.");
  const [ctaText, setCtaText] = useState("Dùng thử miễn phí");
  const [editingHero, setEditingHero] = useState(false);
  const [sectionToggles, setSectionToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTION_TOGGLES.map(s => [s.key, true]))
  );

  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [addingNews, setAddingNews] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");

  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [journeyFilter, setJourneyFilter] = useState<string>("all");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!email || !password) { setLoginError("Vui lòng nhập đầy đủ thông tin."); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      setLoginError("Sai email hoặc mật khẩu admin.");
    }
    setLoading(false);
  };

  const addNews = () => {
    if (!newTitle.trim()) return;
    const article: NewsArticle = {
      id: `n${Date.now()}`, title: newTitle, summary: newSummary,
      date: new Date().toLocaleDateString("vi-VN"), published: false,
    };
    setNews(prev => [article, ...prev]);
    setNewTitle(""); setNewSummary(""); setAddingNews(false);
  };

  const deleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));
  const togglePublish = (id: string) => setNews(prev => prev.map(n => n.id === id ? { ...n, published: !n.published } : n));

  const statusBadge = (status: string) => {
    if (status === "active") return <span className="inline-flex items-center gap-1 bg-[#D4EDE6] text-[#1A5C3A] text-xs font-semibold px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-[#1A5C3A]" />Hoạt động</span>;
    if (status === "expired") return <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />Hết hạn</span>;
    return <span className="inline-flex items-center gap-1 bg-[#fef3e2] text-[#ed8302] text-xs font-semibold px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-[#ed8302]" />Dùng thử</span>;
  };

  const certBadge = (status: string) => {
    if (status === "valid") return <span className="inline-flex items-center gap-1 bg-[#D4EDE6] text-[#1A5C3A] text-xs font-semibold px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" />Hợp lệ</span>;
    if (status === "rejected") return <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" />Từ chối</span>;
    return <span className="inline-flex items-center gap-1 bg-[#fef3e2] text-[#ed8302] text-xs font-semibold px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />Chờ duyệt</span>;
  };

  const allCustomersForDisplay = [
    ...adminCustomers,
    ...(authUser && userCerts.length > 0 ? [{
      id: "current-user",
      name: authUser.name,
      company: "Tài khoản hiện tại",
      email: authUser.email,
      phone: authUser.phone || "—",
      plan: "Demo",
      planExpiry: "—",
      productsCount: 1,
      qrActivated: 1,
      contractStart: new Date().toLocaleDateString("vi-VN"),
      status: "trial" as const,
      certs: userCerts.map(c => ({ id: c.id, name: c.name, fileName: c.fileName, status: c.status })),
    }] : []),
  ];

  // Journey funnel counts
  const funnelCounts = FUNNEL_STEPS.map(step => ({
    ...step,
    count: journeyEvents.filter(e => e.event === step.key).length,
    sessions: new Set(journeyEvents.filter(e => e.event === step.key).map(e => e.sessionId)).size,
  }));

  const maxFunnelCount = Math.max(...funnelCounts.map(s => s.sessions), 1);

  const filteredJourney = journeyFilter === "all"
    ? journeyEvents
    : journeyEvents.filter(e => e.sessionId === journeyFilter);

  const uniqueSessions = [...new Set(journeyEvents.map(e => e.sessionId))];

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[100dvh] bg-gradient-to-br from-[#4A8FE0] to-[#0B2D8A] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-[420px] overflow-hidden">
          <div className="p-8 text-center border-b border-[#E5EAF0]">
            <button onClick={() => navigate("/")} className="block mx-auto mb-4">
              <img src={logoPng} alt="Checkee" className="h-9 mx-auto" />
            </button>
            <h2 className="text-xl font-bold text-[#1557B0]">Admin Panel</h2>
            <p className="text-sm text-[#7D9E94] mt-1">Đăng nhập với tài khoản quản trị</p>
          </div>
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[#1557B0] font-semibold text-sm">Email admin</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@checkee.vn" className="h-11 rounded-xl border-[#E5EAF0]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#1557B0] font-semibold text-sm">Mật khẩu</Label>
                <div className="relative">
                  <Input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="h-11 rounded-xl border-[#E5EAF0] pr-10" />
                  <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7D9E94]">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
              <Button type="submit" disabled={loading} className="w-full h-11 rounded-full bg-[#1557B0] hover:bg-[#0D3F8A] text-white font-semibold">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Đăng nhập"}
              </Button>
            </form>
            <p className="text-center text-xs text-[#7D9E94] mt-4">admin@checkee.vn · Admin@2026</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#F4F6F8] font-sans flex flex-col">
      <header className="h-16 bg-white border-b border-[#E5EAF0] flex items-center px-6 gap-4 sticky top-0 z-40 shadow-sm">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 shrink-0">
          <img src={logoPng} alt="Checkee" className="h-7" />
        </button>
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 border border-red-100">
          <Shield className="w-3.5 h-3.5 text-red-500" />
          <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Admin</span>
        </div>
        <div className="flex-1" />
        <button onClick={() => navigate("/")} className="text-xs text-[#7D9E94] hover:text-[#1557B0] font-semibold">
          Xem website
        </button>
        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-1.5 text-xs text-[#7D9E94] hover:text-red-500 transition-colors px-3 py-2 rounded-full hover:bg-red-50">
          <LogOut className="w-4 h-4" /> Đăng xuất
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 bg-white border-r border-[#E5EAF0] hidden md:flex flex-col p-3 gap-1">
          <button
            onClick={() => setTab("marketing")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "marketing" ? "bg-[#1557B0] text-white" : "text-[#4A5868] hover:bg-[#FAFBFC] hover:text-[#1557B0]"}`}
          >
            <Megaphone className="w-4 h-4 shrink-0" /> Quản lý Marketing
          </button>
          <button
            onClick={() => setTab("customers")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "customers" ? "bg-[#1557B0] text-white" : "text-[#4A5868] hover:bg-[#FAFBFC] hover:text-[#1557B0]"}`}
          >
            <Users className="w-4 h-4 shrink-0" /> Quản lý Khách hàng
          </button>
          <button
            onClick={() => setTab("journey")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "journey" ? "bg-[#1557B0] text-white" : "text-[#4A5868] hover:bg-[#FAFBFC] hover:text-[#1557B0]"}`}
          >
            <Activity className="w-4 h-4 shrink-0" /> Hành trình KH
          </button>
        </aside>

        <main className="flex-1 overflow-y-auto p-6">

          {/* ===== MARKETING TAB ===== */}
          {tab === "marketing" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-[#1557B0]">Quản lý Marketing</h1>
              </div>

              <div className="flex gap-2 flex-wrap">
                {[
                  { key: "content" as MarketingSection, label: "Nội dung Website", icon: Edit3 },
                  { key: "news" as MarketingSection, label: "Tin tức", icon: Newspaper },
                  { key: "images" as MarketingSection, label: "Hình ảnh & Banner", icon: Image },
                ].map(s => (
                  <button
                    key={s.key}
                    onClick={() => setMarketingSection(s.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${marketingSection === s.key ? "bg-[#1557B0] text-white border-[#1557B0]" : "border-[#E5EAF0] text-[#4A5868] hover:border-[#1557B0] hover:text-[#1557B0]"}`}
                  >
                    <s.icon className="w-4 h-4" /> {s.label}
                  </button>
                ))}
              </div>

              {marketingSection === "content" && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-[#1557B0] flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Hero Section</h3>
                      {editingHero
                        ? <div className="flex gap-2">
                            <Button onClick={() => setEditingHero(false)} size="sm" className="h-8 rounded-full bg-[#1557B0] text-white text-xs"><Save className="w-3 h-3 mr-1" />Lưu</Button>
                            <Button onClick={() => setEditingHero(false)} variant="outline" size="sm" className="h-8 rounded-full text-xs"><X className="w-3 h-3" /></Button>
                          </div>
                        : <Button onClick={() => setEditingHero(true)} variant="outline" size="sm" className="h-8 rounded-full text-xs border-[#E5EAF0]"><Edit3 className="w-3 h-3 mr-1" />Chỉnh sửa</Button>
                      }
                    </div>
                    {editingHero ? (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Tiêu đề chính (H1)</Label>
                          <Textarea value={heroTitle} onChange={e => setHeroTitle(e.target.value)} rows={2} className="rounded-xl border-[#E5EAF0] text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Mô tả ngắn</Label>
                          <Textarea value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} rows={3} className="rounded-xl border-[#E5EAF0] text-sm" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Nút CTA</Label>
                          <Input value={ctaText} onChange={e => setCtaText(e.target.value)} className="h-9 rounded-xl border-[#E5EAF0] text-sm" />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#FAFBFC] rounded-xl p-4 space-y-2">
                        <p className="font-bold text-[#0F1B2D] text-lg leading-snug">{heroTitle}</p>
                        <p className="text-sm text-[#4A5868]">{heroSubtitle}</p>
                        <div className="inline-block bg-[#ed8302] text-white text-xs font-bold px-4 py-1.5 rounded-full mt-1">{ctaText}</div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm">
                    <h3 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><Settings2 className="w-4 h-4" /> Hiển thị Sections</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {SECTION_TOGGLES.map(s => (
                        <div key={s.key} className="flex items-center justify-between p-3 border border-[#E5EAF0] rounded-xl">
                          <span className="text-sm font-semibold text-[#0F1B2D]">{s.label}</span>
                          <button
                            onClick={() => setSectionToggles(prev => ({ ...prev, [s.key]: !prev[s.key] }))}
                            className={`relative w-10 h-5 rounded-full transition-colors ${sectionToggles[s.key] ? "bg-[#1557B0]" : "bg-[#E5EAF0]"}`}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${sectionToggles[s.key] ? "translate-x-5" : "translate-x-0.5"}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {marketingSection === "news" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1557B0]">Bài viết Tin tức ({news.length})</h3>
                    <Button onClick={() => setAddingNews(true)} className="h-9 rounded-full bg-[#ed8302] hover:bg-[#d47200] text-white text-sm px-4">
                      <Plus className="w-4 h-4 mr-1" /> Thêm bài viết
                    </Button>
                  </div>

                  {addingNews && (
                    <div className="bg-white rounded-2xl border-2 border-[#1557B0] p-6 shadow-sm space-y-4">
                      <h4 className="font-bold text-[#1557B0]">Bài viết mới</h4>
                      <div className="space-y-1.5">
                        <Label className="text-[#1557B0] text-sm font-semibold">Tiêu đề bài viết</Label>
                        <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Nhập tiêu đề..." className="h-10 rounded-xl border-[#E5EAF0]" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[#1557B0] text-sm font-semibold">Tóm tắt</Label>
                        <Textarea value={newSummary} onChange={e => setNewSummary(e.target.value)} rows={3} placeholder="Mô tả ngắn về bài viết..." className="rounded-xl border-[#E5EAF0]" />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addNews} className="h-9 rounded-full bg-[#1557B0] text-white text-sm"><Save className="w-4 h-4 mr-1" />Lưu bài viết</Button>
                        <Button onClick={() => setAddingNews(false)} variant="outline" className="h-9 rounded-full text-sm">Huỷ</Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {news.map(article => (
                      <div key={article.id} className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#EFF5FF] rounded-xl flex items-center justify-center shrink-0">
                          <Newspaper className="w-5 h-5 text-[#1557B0]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[#0F1B2D] truncate">{article.title}</p>
                          <p className="text-xs text-[#4A5868] mt-0.5 line-clamp-2">{article.summary}</p>
                          <p className="text-xs text-[#7D9E94] mt-1">{article.date}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => togglePublish(article.id)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${article.published ? "bg-[#D4EDE6] text-[#1A5C3A]" : "bg-[#F4F6F8] text-[#7D9E94]"}`}
                          >
                            {article.published ? "Đã đăng" : "Bản nháp"}
                          </button>
                          <button onClick={() => deleteNews(article.id)} className="text-[#7D9E94] hover:text-red-500 transition-colors p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {marketingSection === "images" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1557B0]">Hình ảnh & Banner</h3>
                    <Button className="h-9 rounded-full bg-[#1557B0] text-white text-sm px-4">
                      <Plus className="w-4 h-4 mr-1" /> Upload ảnh
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      { name: "hero-bright-1.png", type: "Hero Banner", src: "/images/hero-bright-1.png" },
                      { name: "hero-bright-2.png", type: "Hero Banner", src: "/images/hero-bright-2.png" },
                      { name: "hero-bright-3.png", type: "Hero Banner", src: "/images/hero-bright-3.png" },
                    ].map((img, i) => (
                      <div key={i} className="bg-white rounded-xl border border-[#E5EAF0] overflow-hidden shadow-sm">
                        <div className="h-32 bg-[#FAFBFC] flex items-center justify-center overflow-hidden">
                          <img src={img.src} alt={img.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                        <div className="p-3">
                          <p className="text-xs font-semibold text-[#0F1B2D] truncate">{img.name}</p>
                          <p className="text-xs text-[#7D9E94]">{img.type}</p>
                        </div>
                      </div>
                    ))}
                    <div className="bg-white rounded-xl border-2 border-dashed border-[#E5EAF0] h-[156px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#1557B0] transition-colors">
                      <Plus className="w-8 h-8 text-[#E5EAF0]" />
                      <span className="text-xs text-[#7D9E94]">Thêm ảnh</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== CUSTOMERS TAB ===== */}
          {tab === "customers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#1557B0]">Quản lý Khách hàng</h1>
                <div className="text-sm text-[#7D9E94]">{allCustomersForDisplay.length} khách hàng</div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Tổng khách hàng", value: allCustomersForDisplay.length.toString(), icon: Users, color: "bg-[#EFF5FF] text-[#1557B0]" },
                  { label: "Đang hoạt động", value: allCustomersForDisplay.filter(c => c.status === "active").length.toString(), icon: CheckCircle2, color: "bg-[#D4EDE6] text-[#1A5C3A]" },
                  { label: "Hết hạn", value: allCustomersForDisplay.filter(c => c.status === "expired").length.toString(), icon: AlertTriangle, color: "bg-red-50 text-red-500" },
                  { label: "Chờ duyệt chứng nhận", value: allCustomersForDisplay.reduce((acc, c) => acc + c.certs.filter(cert => cert.status === "pending").length, 0).toString(), icon: Clock, color: "bg-[#fef3e2] text-[#ed8302]" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold text-[#0F1B2D]">{stat.value}</p>
                    <p className="text-xs text-[#7D9E94] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[#E5EAF0]">
                  <h3 className="font-bold text-[#1557B0]">Danh sách khách hàng</h3>
                </div>
                <div className="divide-y divide-[#F4F6F8]">
                  {allCustomersForDisplay.map(customer => (
                    <div key={customer.id}>
                      <div
                        className="flex items-center gap-4 px-5 py-4 hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                        onClick={() => setExpandedCustomer(expandedCustomer === customer.id ? null : customer.id)}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#1557B0] text-white flex items-center justify-center text-sm font-bold shrink-0">
                          {customer.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#0F1B2D] truncate">{customer.name}</p>
                          <p className="text-xs text-[#7D9E94] truncate">{customer.company}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="font-bold text-[#1557B0]">{customer.plan}</p>
                            <p className="text-xs text-[#7D9E94]">Gói</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#0F1B2D]">{customer.productsCount}</p>
                            <p className="text-xs text-[#7D9E94]">Sản phẩm</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#0F1B2D]">{customer.qrActivated}</p>
                            <p className="text-xs text-[#7D9E94]">QR đã tạo</p>
                          </div>
                          <div className="text-center min-w-[90px]">
                            <p className="font-bold text-[#0F1B2D] text-xs">{customer.planExpiry}</p>
                            <p className="text-xs text-[#7D9E94]">Hết hạn</p>
                          </div>
                          {statusBadge(customer.status)}
                        </div>
                        {customer.certs.some(c => c.status === "pending") && (
                          <span className="bg-[#fef3e2] text-[#ed8302] text-xs font-semibold px-2 py-0.5 rounded-full shrink-0">
                            {customer.certs.filter(c => c.status === "pending").length} chờ duyệt
                          </span>
                        )}
                        {expandedCustomer === customer.id
                          ? <ChevronDown className="w-4 h-4 text-[#7D9E94] shrink-0" />
                          : <ChevronRight className="w-4 h-4 text-[#7D9E94] shrink-0" />
                        }
                      </div>

                      {expandedCustomer === customer.id && (
                        <div className="bg-[#FAFBFC] border-t border-[#E5EAF0] px-5 py-5 space-y-5">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                              { icon: FileText, label: "HĐ bắt đầu", value: customer.contractStart },
                              { icon: Calendar, label: "HĐ hết hạn", value: customer.planExpiry },
                              { icon: Package, label: "Sản phẩm", value: `${customer.productsCount} SKU` },
                              { icon: QrCode, label: "QR kích hoạt", value: `${customer.qrActivated} mã` },
                            ].map((item, i) => (
                              <div key={i} className="bg-white rounded-xl border border-[#E5EAF0] p-3 flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                                  <item.icon className="w-4 h-4 text-[#1557B0]" />
                                </div>
                                <div>
                                  <p className="text-xs text-[#7D9E94]">{item.label}</p>
                                  <p className="font-semibold text-sm text-[#0F1B2D]">{item.value}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-4 text-sm text-[#4A5868]">
                            <span className="flex items-center gap-1.5"><span className="text-[#7D9E94]">📧</span>{customer.email}</span>
                            <span className="flex items-center gap-1.5"><span className="text-[#7D9E94]">📱</span>{customer.phone}</span>
                          </div>

                          <div>
                            <p className="text-sm font-bold text-[#1557B0] mb-3">Chứng nhận & Chứng chỉ</p>
                            {customer.certs.length === 0 ? (
                              <p className="text-sm text-[#7D9E94] italic">Khách hàng chưa upload chứng nhận nào.</p>
                            ) : (
                              <div className="space-y-2">
                                {customer.certs.map(cert => (
                                  <div key={cert.id} className="flex items-center gap-3 bg-white rounded-xl border border-[#E5EAF0] p-3">
                                    <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                                      <FileText className="w-4 h-4 text-[#1557B0]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-[#0F1B2D]">{cert.name}</p>
                                      <p className="text-xs text-[#7D9E94] truncate">{cert.fileName}</p>
                                    </div>
                                    {certBadge(cert.status)}
                                    {cert.status === "pending" && (
                                      <div className="flex gap-2 shrink-0">
                                        <button
                                          onClick={() => customer.id === "current-user"
                                            ? adminVerifyCert(cert.id, "valid")
                                            : adminVerifyCustomerCert(customer.id, cert.id, "valid")}
                                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#D4EDE6] text-[#1A5C3A] text-xs font-semibold hover:bg-[#B8E0D2] transition-colors"
                                        >
                                          <CheckCircle2 className="w-3.5 h-3.5" /> Duyệt
                                        </button>
                                        <button
                                          onClick={() => customer.id === "current-user"
                                            ? adminVerifyCert(cert.id, "rejected")
                                            : adminVerifyCustomerCert(customer.id, cert.id, "rejected")}
                                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors"
                                        >
                                          <XCircle className="w-3.5 h-3.5" /> Từ chối
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== JOURNEY TAB ===== */}
          {tab === "journey" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-[#1557B0]">Hành trình Khách hàng</h1>
                  <p className="text-sm text-[#7D9E94] mt-0.5">Theo dõi từng bước trong hành trình dùng thử — xác định điểm nghẽn để Sale tư vấn kịp thời.</p>
                </div>
              </div>

              {/* Funnel Overview */}
              <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-5 h-5 text-[#1557B0]" />
                  <h3 className="font-bold text-[#1557B0]">Phễu chuyển đổi</h3>
                  <span className="text-xs text-[#7D9E94] ml-1">({journeyEvents.length} sự kiện, {uniqueSessions.length} phiên)</span>
                </div>
                <div className="space-y-3">
                  {funnelCounts.map((step, i) => {
                    const pct = Math.round((step.sessions / maxFunnelCount) * 100);
                    const dropOff = i > 0 ? funnelCounts[i - 1].sessions - step.sessions : 0;
                    return (
                      <div key={step.key} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#1557B0] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                            <span className="font-semibold text-[#0F1B2D]">{step.label}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            {dropOff > 0 && (
                              <span className="text-red-500 font-semibold">-{dropOff} rớt</span>
                            )}
                            <span className="font-bold text-[#1557B0]">{step.sessions} phiên</span>
                            <span className="text-[#7D9E94]">{pct}%</span>
                          </div>
                        </div>
                        <div className="h-2.5 bg-[#F4F6F8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#4A8FE0] to-[#0B2D8A] rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottleneck insight */}
                {funnelCounts.length > 1 && (() => {
                  let maxDrop = 0;
                  let bottleneckStep = "";
                  for (let i = 1; i < funnelCounts.length; i++) {
                    const drop = funnelCounts[i - 1].sessions - funnelCounts[i].sessions;
                    if (drop > maxDrop) { maxDrop = drop; bottleneckStep = funnelCounts[i].label; }
                  }
                  if (!bottleneckStep || maxDrop === 0) return null;
                  return (
                    <div className="mt-4 bg-[#fef3e2] border border-[#fdba74]/40 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[#ed8302] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-[#ed8302]">Điểm nghẽn chính: {bottleneckStep}</p>
                        <p className="text-xs text-[#4A5868] mt-0.5">{maxDrop} phiên bị rớt tại bước này. Sale nên chủ động tư vấn những khách chưa hoàn thành.</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Session timeline */}
              <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                <div className="p-5 border-b border-[#E5EAF0] flex items-center justify-between">
                  <h3 className="font-bold text-[#1557B0] flex items-center gap-2"><Activity className="w-4 h-4" /> Lịch sử hành trình ({journeyEvents.length} sự kiện)</h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#7D9E94]" />
                    <select
                      value={journeyFilter}
                      onChange={e => setJourneyFilter(e.target.value)}
                      className="text-xs border border-[#E5EAF0] rounded-lg px-2 py-1.5 text-[#0F1B2D] bg-white"
                    >
                      <option value="all">Tất cả phiên ({uniqueSessions.length})</option>
                      {uniqueSessions.map(sid => (
                        <option key={sid} value={sid}>{sid.slice(0, 20)}...</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="divide-y divide-[#F4F6F8] max-h-[480px] overflow-y-auto">
                  {[...filteredJourney].reverse().map(event => (
                    <div key={event.id} className="flex items-start gap-3 px-5 py-3 hover:bg-[#FAFBFC]">
                      <div className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${JOURNEY_EVENT_COLORS[event.event] ?? "bg-[#F4F6F8] text-[#4A5868] border-[#E5EAF0]"}`}>
                        {event.step !== undefined ? `B${event.step}` : "—"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0F1B2D]">{event.label}</p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          {event.userName && <span className="text-xs text-[#1557B0] font-semibold">{event.userName}</span>}
                          <span className="text-xs text-[#7D9E94] font-mono">{event.sessionId.slice(0, 18)}…</span>
                          {event.meta && Object.entries(event.meta).map(([k, v]) => (
                            <span key={k} className="text-[10px] bg-[#fef3e2] text-[#ed8302] px-1.5 py-0.5 rounded font-semibold">{k}: {String(v)}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-[#7D9E94] shrink-0 whitespace-nowrap">{formatTime(event.timestamp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
