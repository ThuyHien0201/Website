import { useState } from "react";
import { useLocation } from "wouter";
import {
  LayoutGrid, Users, Megaphone, Eye, EyeOff, Loader2, LogOut,
  Plus, Trash2, CheckCircle2, XCircle, Clock, ChevronDown, ChevronRight,
  FileText, Image, Newspaper, Settings2, Shield, QrCode, Package, Calendar,
  AlertTriangle, Edit3, Save, X, Activity, TrendingUp, Filter,
  Phone, Building2, MapPin, CreditCard, BarChart3, MessageSquare,
  StickyNote, Bell, ArrowUpRight, Download, Printer, ChevronLeft,
  Globe, Tag, Search, Layers, Monitor, Smartphone, Tablet, Palette,
  CalendarDays, Users2, ExternalLink, BookOpen, RefreshCw, Info,
  Mail, Star, Hash, Lock, User, DollarSign, Receipt, BadgeCheck,
  LayoutDashboard
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
type MarketingSection = "interface" | "news" | "events";
type CustomerDetailTab = "info" | "plan" | "payment" | "usage" | "support" | "notes" | "renewal" | "contract";

type NewsArticle = {
  id: string; title: string; slug: string; summary: string;
  content: string; date: string; published: boolean; category: string;
  tags: string; author: string; seoTitle: string; seoDesc: string;
};

type Event = {
  id: string; name: string; summary: string; content: string;
  startDate: string; endDate: string; location: string; mapLink: string;
  banner: string; status: "upcoming" | "ongoing" | "ended";
  registrations: number; published: boolean;
};

type PaymentRecord = {
  id: string; date: string; amount: string; method: string;
  status: "paid" | "pending" | "failed";
};

type SupportTicket = {
  id: string; date: string; subject: string; status: "open" | "closed" | "pending";
  priority: "low" | "medium" | "high";
};

type InternalNote = {
  id: string; date: string; author: string; content: string;
};

type PlanHistoryEntry = {
  date: string; from: string; to: string; action: "upgrade" | "downgrade" | "renew";
};

type ExtendedCustomer = {
  id: string; name: string; company: string; email: string; phone: string;
  address: string; region: string;
  plan: string; purchaseDate: string; planExpiry: string;
  billingCycle: "monthly" | "yearly";
  status: "active" | "expired" | "trial";
  productsCount: number; qrActivated: number; contractStart: string;
  planLimit: number; qrLimit: number; lastActivity: string;
  paymentHistory: PaymentRecord[];
  supportTickets: SupportTicket[];
  notes: InternalNote[];
  planHistory: PlanHistoryEntry[];
  certs: { id: string; name: string; fileName: string; status: "pending" | "valid" | "rejected" }[];
  renewalReminderDays: number;
  contractSignDate: string; contractExpiry: string;
};

const INITIAL_NEWS: NewsArticle[] = [
  { id: "n1", title: "Checkee ra mắt tính năng DPP cho thị trường EU", slug: "checkee-dpp-eu-2026", summary: "Nền tảng Checkee chính thức hỗ trợ Digital Product Passport giúp doanh nghiệp Việt tiếp cận thị trường châu Âu.", content: "", date: "10/05/2026", published: true, category: "Sản phẩm", tags: "DPP, EU, xuất khẩu", author: "Admin Checkee", seoTitle: "Checkee DPP EU 2026", seoDesc: "Giải pháp Digital Product Passport cho doanh nghiệp Việt" },
  { id: "n2", title: "Hội thảo truy xuất nguồn gốc 2026 tại Hà Nội", slug: "hoi-thao-txng-2026", summary: "Checkee đồng hành cùng Bộ Nông nghiệp trong hội thảo số hóa chuỗi cung ứng thực phẩm.", content: "", date: "25/04/2026", published: true, category: "Sự kiện", tags: "hội thảo, TXNG, nông nghiệp", author: "Admin Checkee", seoTitle: "Hội thảo TXNG 2026", seoDesc: "Sự kiện truy xuất nguồn gốc tại Hà Nội" },
  { id: "n3", title: "Cập nhật giao diện ứng dụng v2.5", slug: "cap-nhat-v2-5", summary: "Phiên bản mới mang đến trải nghiệm tốt hơn với dashboard được thiết kế lại hoàn toàn.", content: "", date: "01/04/2026", published: false, category: "Cập nhật", tags: "v2.5, cập nhật, dashboard", author: "Admin Checkee", seoTitle: "Checkee v2.5", seoDesc: "Phiên bản cập nhật mới nhất từ Checkee" },
];

const INITIAL_EVENTS: Event[] = [
  { id: "e1", name: "Hội thảo Truy xuất Nguồn gốc 2026", summary: "Chuỗi hội thảo quốc gia về số hóa chuỗi cung ứng nông sản.", content: "", startDate: "20/06/2026", endDate: "21/06/2026", location: "Trung tâm Hội nghị Quốc gia, Hà Nội", mapLink: "https://maps.google.com", banner: "", status: "upcoming", registrations: 142, published: true },
  { id: "e2", name: "Checkee x F&B Summit 2026", summary: "Sự kiện kết nối doanh nghiệp F&B với công nghệ định danh sản phẩm.", content: "", startDate: "10/05/2026", endDate: "10/05/2026", location: "Gem Center, TP. Hồ Chí Minh", mapLink: "", banner: "", status: "ended", registrations: 89, published: true },
];

const SECTION_TOGGLES = [
  { key: "hero", label: "Hero Section" },
  { key: "solutions", label: "Giải pháp" },
  { key: "pricing", label: "Bảng giá" },
  { key: "testimonials", label: "Đánh giá khách hàng" },
  { key: "faq", label: "Câu hỏi thường gặp" },
  { key: "cta", label: "CTA cuối trang" },
  { key: "news", label: "Tin tức" },
  { key: "events", label: "Sự kiện" },
];

const JOURNEY_EVENT_COLORS: Record<string, string> = {
  clicked_trial: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  completed_step1: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  completed_step2: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  completed_step3: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
  generated_qr: "bg-[#EFF5FF] text-[#1557B0] border-[#DCEEFF]",
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

const EXTENDED_CUSTOMERS: ExtendedCustomer[] = [
  {
    id: "c1", name: "Nguyễn Văn Hùng", company: "Công ty TNHH Nông sản Tây Nguyên",
    email: "hung@nongsan.vn", phone: "0901234567",
    address: "123 Đường Lê Lợi, TP. Buôn Ma Thuột", region: "Đắk Lắk",
    plan: "Tăng trưởng", purchaseDate: "10/05/2026", planExpiry: "10/05/2027",
    billingCycle: "yearly", status: "active",
    productsCount: 24, qrActivated: 312, contractStart: "10/05/2026",
    planLimit: 50, qrLimit: 500, lastActivity: "Hôm nay, 09:32",
    paymentHistory: [
      { id: "p1", date: "10/05/2026", amount: "4.800.000 đ", method: "Chuyển khoản", status: "paid" },
      { id: "p2", date: "10/05/2025", amount: "3.600.000 đ", method: "Chuyển khoản", status: "paid" },
    ],
    supportTickets: [
      { id: "t1", date: "01/05/2026", subject: "Không tải được chứng nhận HACCP", status: "closed", priority: "medium" },
      { id: "t2", date: "15/05/2026", subject: "Hỏi về tính năng đa ngôn ngữ QR", status: "open", priority: "low" },
    ],
    notes: [
      { id: "nt1", date: "10/05/2026", author: "Nguyễn Sales", content: "Khách quan tâm upsell lên Enterprise sau 6 tháng. Hẹn callback tháng 11/2026." },
    ],
    planHistory: [
      { date: "10/05/2025", from: "Khởi đầu", to: "Tăng trưởng", action: "upgrade" },
    ],
    certs: [
      { id: "cc1", name: "VietGAP", fileName: "vietgap_cert.pdf", status: "valid" },
      { id: "cc2", name: "HACCP", fileName: "haccp_2026.pdf", status: "pending" },
    ],
    renewalReminderDays: 30,
    contractSignDate: "10/05/2026", contractExpiry: "10/05/2027",
  },
  {
    id: "c2", name: "Trần Thị Lan", company: "Công ty CP Xuất khẩu Đồng Tháp",
    email: "lan@dongthap.com", phone: "0912345678",
    address: "45 Đường Nguyễn Huệ, TP. Cao Lãnh", region: "Đồng Tháp",
    plan: "Chuyên nghiệp", purchaseDate: "15/03/2026", planExpiry: "15/03/2027",
    billingCycle: "yearly", status: "active",
    productsCount: 58, qrActivated: 1240, contractStart: "15/03/2026",
    planLimit: 100, qrLimit: 2000, lastActivity: "Hôm qua, 15:41",
    paymentHistory: [
      { id: "p3", date: "15/03/2026", amount: "9.600.000 đ", method: "Thẻ Visa", status: "paid" },
    ],
    supportTickets: [
      { id: "t3", date: "20/03/2026", subject: "Yêu cầu xuất báo cáo theo tuần", status: "pending", priority: "high" },
    ],
    notes: [
      { id: "nt2", date: "15/03/2026", author: "Lê CS", content: "Khách xuất khẩu sang Nhật, cần hỗ trợ tích hợp GS1 Japan. Đã forward cho team kỹ thuật." },
    ],
    planHistory: [],
    certs: [
      { id: "cc3", name: "GlobalGAP", fileName: "globalgap.pdf", status: "valid" },
      { id: "cc4", name: "ISO 22000", fileName: "iso22000.pdf", status: "valid" },
      { id: "cc5", name: "EU Organic", fileName: "eu_organic.pdf", status: "pending" },
    ],
    renewalReminderDays: 45,
    contractSignDate: "15/03/2026", contractExpiry: "15/03/2027",
  },
  {
    id: "c3", name: "Lê Minh Tuấn", company: "Hộ kinh doanh Mật ong Tuấn",
    email: "tuan@matong.com", phone: "0923456789",
    address: "12 Đường Trần Phú, TP. Đà Lạt", region: "Lâm Đồng",
    plan: "Khởi đầu", purchaseDate: "05/04/2025", planExpiry: "05/04/2026",
    billingCycle: "yearly", status: "expired",
    productsCount: 4, qrActivated: 48, contractStart: "05/04/2025",
    planLimit: 10, qrLimit: 100, lastActivity: "15/04/2026",
    paymentHistory: [
      { id: "p4", date: "05/04/2025", amount: "1.800.000 đ", method: "Chuyển khoản", status: "paid" },
      { id: "p5", date: "05/04/2026", amount: "1.800.000 đ", method: "—", status: "pending" },
    ],
    supportTickets: [],
    notes: [
      { id: "nt3", date: "10/04/2026", author: "Nguyễn Sales", content: "Gọi điện nhắc gia hạn nhưng không nghe máy. Thử lại sau 1 tuần." },
    ],
    planHistory: [],
    certs: [],
    renewalReminderDays: 14,
    contractSignDate: "05/04/2025", contractExpiry: "05/04/2026",
  },
  {
    id: "c4", name: "Phạm Quốc Anh", company: "Công ty TNHH Thực phẩm Việt Xanh",
    email: "anh@vietxanh.vn", phone: "0934567890",
    address: "88 Đường Hoàng Văn Thụ, Quận Tân Bình", region: "TP. Hồ Chí Minh",
    plan: "Doanh nghiệp", purchaseDate: "20/06/2026", planExpiry: "20/06/2027",
    billingCycle: "yearly", status: "active",
    productsCount: 132, qrActivated: 5480, contractStart: "20/06/2026",
    planLimit: 500, qrLimit: 10000, lastActivity: "Hôm nay, 11:05",
    paymentHistory: [
      { id: "p6", date: "20/06/2026", amount: "24.000.000 đ", method: "Chuyển khoản", status: "paid" },
      { id: "p7", date: "20/06/2025", amount: "18.000.000 đ", method: "Chuyển khoản", status: "paid" },
    ],
    supportTickets: [
      { id: "t4", date: "22/06/2026", subject: "Yêu cầu API tích hợp ERP nội bộ", status: "open", priority: "high" },
      { id: "t5", date: "25/06/2026", subject: "Báo lỗi không in được QR trên Chrome", status: "closed", priority: "medium" },
    ],
    notes: [
      { id: "nt4", date: "20/06/2026", author: "Trần BD", content: "Khách là khách VIP, đang thảo luận mở rộng sang gói Enterprise custom. Dự kiến Q3/2026." },
    ],
    planHistory: [
      { date: "20/06/2025", from: "Chuyên nghiệp", to: "Doanh nghiệp", action: "upgrade" },
    ],
    certs: [{ id: "cc6", name: "USDA Organic", fileName: "usda_cert.pdf", status: "valid" }],
    renewalReminderDays: 60,
    contractSignDate: "20/06/2026", contractExpiry: "20/06/2027",
  },
];

export default function Admin() {
  const [, navigate] = useLocation();
  const { adminVerifyCustomerCert, userCerts, adminVerifyCert, user: authUser, journeyEvents } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [tab, setTab] = useState<AdminTab>("marketing");
  const [marketingSection, setMarketingSection] = useState<MarketingSection>("interface");

  // Interface builder state
  const [heroTitle, setHeroTitle] = useState("Minh bạch chuỗi cung ứng, nâng tầm thương hiệu Việt.");
  const [heroSubtitle, setHeroSubtitle] = useState("Checkee phát triển nền tảng số phục vụ quản lý, định danh và truy xuất nguồn gốc sản phẩm hàng hoá.");
  const [ctaText, setCtaText] = useState("Dùng thử miễn phí");
  const [editingHero, setEditingHero] = useState(false);
  const [sectionToggles, setSectionToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTION_TOGGLES.map(s => [s.key, true]))
  );
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // News state
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [addingNews, setAddingNews] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newCategory, setNewCategory] = useState("Tin tức");
  const [newSlug, setNewSlug] = useState("");
  const [newSeoTitle, setNewSeoTitle] = useState("");
  const [newSeoDesc, setNewSeoDesc] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newsSearch, setNewsSearch] = useState("");
  const [newsCategoryFilter, setNewsCategoryFilter] = useState("all");
  const [newsStatusFilter, setNewsStatusFilter] = useState("all");

  // Events state
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [addingEvent, setAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [evtName, setEvtName] = useState("");
  const [evtSummary, setEvtSummary] = useState("");
  const [evtStart, setEvtStart] = useState("");
  const [evtEnd, setEvtEnd] = useState("");
  const [evtLocation, setEvtLocation] = useState("");
  const [evtMap, setEvtMap] = useState("");
  const [eventSearch, setEventSearch] = useState("");
  const [eventStatusFilter, setEventStatusFilter] = useState("all");

  // Customers state
  const [customers, setCustomers] = useState<ExtendedCustomer[]>(EXTENDED_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<ExtendedCustomer | null>(null);
  const [customerDetailTab, setCustomerDetailTab] = useState<CustomerDetailTab>("info");
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerStatusFilter, setCustomerStatusFilter] = useState("all");
  const [newNote, setNewNote] = useState("");
  const [reportPeriod, setReportPeriod] = useState("month");

  // Journey state
  const [journeyFilter, setJourneyFilter] = useState<string>("all");
  const [journeyViewMode, setJourneyViewMode] = useState<"funnel" | "leads" | "timeline">("leads");

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
      id: `n${Date.now()}`, title: newTitle, slug: newSlug || newTitle.toLowerCase().replace(/\s+/g, "-"),
      summary: newSummary, content: "", date: new Date().toLocaleDateString("vi-VN"),
      published: false, category: newCategory, tags: newTags,
      author: "Admin Checkee", seoTitle: newSeoTitle || newTitle, seoDesc: newSeoDesc || newSummary,
    };
    setNews(prev => [article, ...prev]);
    setNewTitle(""); setNewSummary(""); setNewCategory("Tin tức");
    setNewSlug(""); setNewSeoTitle(""); setNewSeoDesc(""); setNewTags("");
    setAddingNews(false);
  };

  const deleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));
  const togglePublish = (id: string) => setNews(prev => prev.map(n => n.id === id ? { ...n, published: !n.published } : n));

  const addEvent = () => {
    if (!evtName.trim()) return;
    const evt: Event = {
      id: `e${Date.now()}`, name: evtName, summary: evtSummary, content: "",
      startDate: evtStart, endDate: evtEnd, location: evtLocation, mapLink: evtMap,
      banner: "", status: "upcoming", registrations: 0, published: false,
    };
    setEvents(prev => [evt, ...prev]);
    setEvtName(""); setEvtSummary(""); setEvtStart(""); setEvtEnd("");
    setEvtLocation(""); setEvtMap("");
    setAddingEvent(false);
  };

  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));
  const toggleEventPublish = (id: string) => setEvents(prev => prev.map(e => e.id === id ? { ...e, published: !e.published } : e));

  const confirmPayment = (customerId: string, paymentId: string, status: "paid" | "pending" | "failed") => {
    setCustomers(prev => prev.map(c =>
      c.id === customerId
        ? { ...c, paymentHistory: c.paymentHistory.map(p => p.id === paymentId ? { ...p, status } : p) }
        : c
    ));
    if (selectedCustomer?.id === customerId) {
      setSelectedCustomer(prev => prev ? {
        ...prev,
        paymentHistory: prev.paymentHistory.map(p => p.id === paymentId ? { ...p, status } : p)
      } : null);
    }
  };

  const addNote = (customerId: string) => {
    if (!newNote.trim()) return;
    const note: InternalNote = {
      id: `nt${Date.now()}`, date: new Date().toLocaleDateString("vi-VN"),
      author: "Admin", content: newNote,
    };
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, notes: [note, ...c.notes] } : c));
    setSelectedCustomer(prev => prev ? { ...prev, notes: [note, ...prev.notes] } : null);
    setNewNote("");
  };

  const verifyCert = (customerId: string, certId: string, status: "valid" | "rejected") => {
    if (customerId === "current-user") {
      adminVerifyCert(certId, status);
    } else {
      adminVerifyCustomerCert(customerId, certId, status);
      setCustomers(prev => prev.map(c =>
        c.id === customerId
          ? { ...c, certs: c.certs.map(cert => cert.id === certId ? { ...cert, status } : cert) }
          : c
      ));
      if (selectedCustomer?.id === customerId) {
        setSelectedCustomer(prev => prev ? {
          ...prev, certs: prev.certs.map(cert => cert.id === certId ? { ...cert, status } : cert)
        } : null);
      }
    }
  };

  const statusBadge = (status: string) => {
    if (status === "active") return <span className="inline-flex items-center gap-1 bg-[#EFF5FF] text-[#1557B0] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#DCEEFF]"><span className="w-1.5 h-1.5 rounded-full bg-[#1557B0]" />Hoạt động</span>;
    if (status === "expired") return <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-red-500" />Hết hạn</span>;
    return <span className="inline-flex items-center gap-1 bg-[#fef3e2] text-[#ed8302] text-xs font-semibold px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-[#ed8302]" />Dùng thử</span>;
  };

  const certBadge = (status: string) => {
    if (status === "valid") return <span className="inline-flex items-center gap-1 bg-[#EFF5FF] text-[#1557B0] text-xs font-semibold px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" />Hợp lệ</span>;
    if (status === "rejected") return <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" />Từ chối</span>;
    return <span className="inline-flex items-center gap-1 bg-[#fef3e2] text-[#ed8302] text-xs font-semibold px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />Chờ duyệt</span>;
  };

  const paymentBadge = (status: string) => {
    if (status === "paid") return <span className="inline-flex items-center gap-1 bg-[#EFF5FF] text-[#1557B0] text-xs font-semibold px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" />Đã thanh toán</span>;
    if (status === "failed") return <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full"><XCircle className="w-3 h-3" />Thất bại</span>;
    return <span className="inline-flex items-center gap-1 bg-[#fef3e2] text-[#ed8302] text-xs font-semibold px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />Chờ duyệt</span>;
  };

  const ticketPriorityBadge = (p: string) => {
    if (p === "high") return <span className="text-[10px] font-bold bg-red-50 text-red-500 px-1.5 py-0.5 rounded">Cao</span>;
    if (p === "medium") return <span className="text-[10px] font-bold bg-[#fef3e2] text-[#ed8302] px-1.5 py-0.5 rounded">TB</span>;
    return <span className="text-[10px] font-bold bg-[#F4F6F8] text-[#7D9E94] px-1.5 py-0.5 rounded">Thấp</span>;
  };

  const ticketStatusBadge = (s: string) => {
    if (s === "open") return <span className="text-[10px] font-bold bg-[#EFF5FF] text-[#1557B0] px-1.5 py-0.5 rounded">Mở</span>;
    if (s === "closed") return <span className="text-[10px] font-bold bg-[#F4F6F8] text-[#7D9E94] px-1.5 py-0.5 rounded">Đóng</span>;
    return <span className="text-[10px] font-bold bg-[#fef3e2] text-[#ed8302] px-1.5 py-0.5 rounded">Chờ</span>;
  };

  const eventStatusBadge = (s: string) => {
    if (s === "upcoming") return <span className="text-xs font-semibold bg-[#EFF5FF] text-[#1557B0] px-2 py-0.5 rounded-full">Sắp diễn ra</span>;
    if (s === "ongoing") return <span className="text-xs font-semibold bg-[#EFF5FF] text-[#1557B0] px-2 py-0.5 rounded-full border border-[#1557B0]">Đang diễn ra</span>;
    return <span className="text-xs font-semibold bg-[#F4F6F8] text-[#7D9E94] px-2 py-0.5 rounded-full">Đã kết thúc</span>;
  };

  const filteredCustomers = customers.filter(c => {
    const matchSearch = !customerSearch || c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.company.toLowerCase().includes(customerSearch.toLowerCase()) || c.email.toLowerCase().includes(customerSearch.toLowerCase());
    const matchStatus = customerStatusFilter === "all" || c.status === customerStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredNews = news.filter(n => {
    const matchSearch = !newsSearch || n.title.toLowerCase().includes(newsSearch.toLowerCase());
    const matchCat = newsCategoryFilter === "all" || n.category === newsCategoryFilter;
    const matchStatus = newsStatusFilter === "all" || (newsStatusFilter === "published" ? n.published : !n.published);
    return matchSearch && matchCat && matchStatus;
  });

  const filteredEvents = events.filter(e => {
    const matchSearch = !eventSearch || e.name.toLowerCase().includes(eventSearch.toLowerCase());
    const matchStatus = eventStatusFilter === "all" || e.status === eventStatusFilter;
    return matchSearch && matchStatus;
  });

  const funnelCounts = FUNNEL_STEPS.map(step => ({
    ...step,
    count: journeyEvents.filter(e => e.event === step.key).length,
    sessions: new Set(journeyEvents.filter(e => e.event === step.key).map(e => e.sessionId)).size,
  }));

  const maxFunnelCount = Math.max(...funnelCounts.map(s => s.sessions), 1);
  const uniqueSessions = [...new Set(journeyEvents.map(e => e.sessionId))];

  const filteredJourney = journeyFilter === "all"
    ? journeyEvents
    : journeyEvents.filter(e => e.sessionId === journeyFilter);

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  const sessionLeads = uniqueSessions.map(sid => {
    const evts = journeyEvents.filter(e => e.sessionId === sid).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const step1 = evts.find(e => e.event === "completed_step1");
    const lastEvent = evts[evts.length - 1];
    const lastStep = FUNNEL_STEPS.findIndex(s => s.key === lastEvent?.event);
    const completed = evts.some(e => e.event === "selected_plan" || e.event === "generated_qr");
    return {
      sessionId: sid,
      company: step1?.meta?.company as string || "—",
      phone: step1?.meta?.phone as string || "—",
      userName: step1?.userName || evts[0]?.userName || "Khách vãng lai",
      lastStep: lastStep >= 0 ? FUNNEL_STEPS[lastStep].label : "—",
      lastEventKey: lastEvent?.event || "",
      completed,
      time: evts[0]?.timestamp,
      stuck: !completed && !!step1,
    };
  });

  const stuckLeads = sessionLeads.filter(l => l.stuck);

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
            onClick={() => { setTab("customers"); setSelectedCustomer(null); }}
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

          {/* ====================== MARKETING TAB ====================== */}
          {tab === "marketing" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl font-bold text-[#1557B0]">Quản lý Marketing</h1>
              </div>

              <div className="flex gap-2 flex-wrap">
                {[
                  { key: "interface" as MarketingSection, label: "Quản lý Giao diện", icon: Palette },
                  { key: "news" as MarketingSection, label: "Quản lý Tin tức", icon: Newspaper },
                  { key: "events" as MarketingSection, label: "Quản lý Sự kiện", icon: CalendarDays },
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

              {/* ---- INTERFACE MANAGEMENT ---- */}
              {marketingSection === "interface" && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-[#1557B0] flex items-center gap-2"><Palette className="w-4 h-4" /> Page Builder</h3>
                        <p className="text-xs text-[#7D9E94] mt-0.5">Chỉnh sửa nội dung website mà không cần code</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {[
                          { key: "desktop" as const, icon: Monitor },
                          { key: "tablet" as const, icon: Tablet },
                          { key: "mobile" as const, icon: Smartphone },
                        ].map(d => (
                          <button key={d.key} onClick={() => setPreviewDevice(d.key)}
                            className={`p-1.5 rounded-lg transition-colors ${previewDevice === d.key ? "bg-[#1557B0] text-white" : "text-[#7D9E94] hover:bg-[#F4F6F8]"}`}>
                            <d.icon className="w-4 h-4" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-[#4A5868] uppercase tracking-wide flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5" /> Hero Section</span>
                          {editingHero
                            ? <div className="flex gap-1.5">
                                <button onClick={() => setEditingHero(false)} className="h-7 px-3 rounded-full bg-[#1557B0] text-white text-xs font-semibold flex items-center gap-1"><Save className="w-3 h-3" />Lưu</button>
                                <button onClick={() => setEditingHero(false)} className="h-7 px-2 rounded-full border border-[#E5EAF0] text-xs text-[#7D9E94]"><X className="w-3 h-3" /></button>
                              </div>
                            : <button onClick={() => setEditingHero(true)} className="h-7 px-3 rounded-full border border-[#E5EAF0] text-xs text-[#4A5868] flex items-center gap-1 hover:border-[#1557B0] hover:text-[#1557B0]"><Edit3 className="w-3 h-3" />Sửa</button>
                          }
                        </div>
                        {editingHero ? (
                          <div className="space-y-3">
                            <div>
                              <label className="text-[10px] font-semibold text-[#7D9E94] uppercase mb-1 block">Tiêu đề H1</label>
                              <Textarea value={heroTitle} onChange={e => setHeroTitle(e.target.value)} rows={2} className="rounded-xl border-[#E5EAF0] text-sm" />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-[#7D9E94] uppercase mb-1 block">Mô tả</label>
                              <Textarea value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} rows={2} className="rounded-xl border-[#E5EAF0] text-sm" />
                            </div>
                            <div>
                              <label className="text-[10px] font-semibold text-[#7D9E94] uppercase mb-1 block">Nút CTA</label>
                              <Input value={ctaText} onChange={e => setCtaText(e.target.value)} className="h-9 rounded-xl border-[#E5EAF0] text-sm" />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="font-bold text-[#0F1B2D] text-sm leading-snug">{heroTitle}</p>
                            <p className="text-xs text-[#4A5868]">{heroSubtitle}</p>
                            <span className="inline-block bg-[#ed8302] text-white text-xs font-bold px-3 py-1 rounded-full">{ctaText}</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-4">
                        <span className="text-xs font-bold text-[#4A5868] uppercase tracking-wide flex items-center gap-1.5 mb-3"><Settings2 className="w-3.5 h-3.5" /> Ẩn/Hiện Sections</span>
                        <div className="space-y-2">
                          {SECTION_TOGGLES.map(s => (
                            <div key={s.key} className="flex items-center justify-between">
                              <span className="text-sm text-[#0F1B2D]">{s.label}</span>
                              <button
                                onClick={() => setSectionToggles(prev => ({ ...prev, [s.key]: !prev[s.key] }))}
                                className={`relative w-9 h-5 rounded-full transition-colors ${sectionToggles[s.key] ? "bg-[#1557B0]" : "bg-[#E5EAF0]"}`}
                              >
                                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${sectionToggles[s.key] ? "translate-x-4" : "translate-x-0.5"}`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-4 mb-5">
                      <span className="text-xs font-bold text-[#4A5868] uppercase tracking-wide flex items-center gap-1.5 mb-3"><Globe className="w-3.5 h-3.5" /> Trang cần quản lý</span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["Trang chủ", "Truy xuất nguồn gốc", "E-Label", "Checkee F&B", "Hộ chiếu số", "Dùng thử miễn phí", "Footer", "Header/Menu"].map((p, i) => (
                          <button key={i} className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E5EAF0] bg-white hover:border-[#1557B0] hover:bg-[#EFF5FF] transition-all text-xs font-semibold text-[#4A5868] hover:text-[#1557B0]">
                            <LayoutGrid className="w-3.5 h-3.5 shrink-0" /> {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-4 mb-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#4A5868] uppercase tracking-wide flex items-center gap-1.5"><Image className="w-3.5 h-3.5" /> Media Library</span>
                        <button className="h-7 px-3 rounded-full bg-[#1557B0] text-white text-xs font-semibold flex items-center gap-1"><Plus className="w-3 h-3" />Upload</button>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {["hero-bright-1.png", "hero-bright-2.png", "hero-bright-3.png"].map((name, i) => (
                          <div key={i} className="rounded-xl border border-[#E5EAF0] bg-white overflow-hidden">
                            <div className="h-20 bg-[#F4F6F8] flex items-center justify-center">
                              <img src={`/images/${name}`} alt={name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                            </div>
                            <p className="text-[10px] text-[#7D9E94] p-1.5 truncate">{name}</p>
                          </div>
                        ))}
                        <div className="rounded-xl border-2 border-dashed border-[#E5EAF0] h-[80px] flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#1557B0] transition-colors">
                          <Plus className="w-5 h-5 text-[#E5EAF0]" />
                          <span className="text-[10px] text-[#7D9E94]">Thêm ảnh</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-[#E5EAF0]">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1557B0] text-white text-sm font-semibold hover:bg-[#0D3F8A] transition-colors">
                        <Globe className="w-4 h-4" /> Xuất bản
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5EAF0] text-[#4A5868] text-sm font-semibold hover:border-[#1557B0] hover:text-[#1557B0] transition-colors">
                        <Save className="w-4 h-4" /> Lưu nháp
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5EAF0] text-[#4A5868] text-sm font-semibold hover:text-[#1557B0] transition-colors">
                        <RefreshCw className="w-4 h-4" /> Hoàn tác
                      </button>
                      <div className="ml-auto flex items-center gap-1.5 text-xs text-[#7D9E94]">
                        <BadgeCheck className="w-3.5 h-3.5 text-[#1557B0]" />
                        <span>Phân quyền: <strong>Admin</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---- NEWS MANAGEMENT ---- */}
              {marketingSection === "news" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1557B0]">Bài viết Tin tức ({filteredNews.length})</h3>
                    <Button onClick={() => setAddingNews(true)} className="h-9 rounded-full bg-[#ed8302] hover:bg-[#d47200] text-white text-sm px-4">
                      <Plus className="w-4 h-4 mr-1" /> Thêm bài viết
                    </Button>
                  </div>

                  <div className="flex gap-2 flex-wrap items-center">
                    <div className="relative flex-1 min-w-[180px]">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7D9E94]" />
                      <Input value={newsSearch} onChange={e => setNewsSearch(e.target.value)} placeholder="Tìm kiếm bài viết..." className="h-9 pl-9 rounded-xl border-[#E5EAF0] text-sm" />
                    </div>
                    <select value={newsCategoryFilter} onChange={e => setNewsCategoryFilter(e.target.value)} className="h-9 text-xs border border-[#E5EAF0] rounded-xl px-3 text-[#0F1B2D] bg-white">
                      <option value="all">Tất cả danh mục</option>
                      <option value="Sản phẩm">Sản phẩm</option>
                      <option value="Sự kiện">Sự kiện</option>
                      <option value="Cập nhật">Cập nhật</option>
                      <option value="Tin tức">Tin tức</option>
                    </select>
                    <select value={newsStatusFilter} onChange={e => setNewsStatusFilter(e.target.value)} className="h-9 text-xs border border-[#E5EAF0] rounded-xl px-3 text-[#0F1B2D] bg-white">
                      <option value="all">Tất cả trạng thái</option>
                      <option value="published">Đã đăng</option>
                      <option value="draft">Bản nháp</option>
                    </select>
                  </div>

                  {addingNews && (
                    <div className="bg-white rounded-2xl border-2 border-[#1557B0] p-6 shadow-sm space-y-4">
                      <h4 className="font-bold text-[#1557B0]">Bài viết mới</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Tiêu đề bài viết *</Label>
                          <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Nhập tiêu đề..." className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Slug URL</Label>
                          <Input value={newSlug} onChange={e => setNewSlug(e.target.value)} placeholder="ten-bai-viet" className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Danh mục</Label>
                          <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="h-10 w-full text-sm border border-[#E5EAF0] rounded-xl px-3 text-[#0F1B2D] bg-white">
                            {["Tin tức", "Sản phẩm", "Sự kiện", "Cập nhật", "Hướng dẫn"].map(c => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Tags</Label>
                          <Input value={newTags} onChange={e => setNewTags(e.target.value)} placeholder="tag1, tag2, tag3" className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <Label className="text-[#1557B0] text-sm font-semibold">Mô tả ngắn</Label>
                          <Textarea value={newSummary} onChange={e => setNewSummary(e.target.value)} rows={2} placeholder="Tóm tắt nội dung bài viết..." className="rounded-xl border-[#E5EAF0]" />
                        </div>
                      </div>
                      <div className="border-t border-[#E5EAF0] pt-4">
                        <p className="text-xs font-bold text-[#7D9E94] uppercase tracking-wide mb-3 flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> SEO</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label className="text-xs text-[#4A5868]">SEO Title</Label>
                            <Input value={newSeoTitle} onChange={e => setNewSeoTitle(e.target.value)} placeholder="Tiêu đề hiển thị trên Google" className="h-9 rounded-xl border-[#E5EAF0] text-sm" />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-[#4A5868]">Meta Description</Label>
                            <Input value={newSeoDesc} onChange={e => setNewSeoDesc(e.target.value)} placeholder="Mô tả hiển thị trên Google" className="h-9 rounded-xl border-[#E5EAF0] text-sm" />
                          </div>
                        </div>
                        <div className="mt-3 bg-[#F4F6F8] rounded-xl p-3 text-xs">
                          <p className="text-[#1557B0] font-semibold hover:underline cursor-pointer">{newSeoTitle || newTitle || "Tiêu đề Google"}</p>
                          <p className="text-[#4A5868] mt-0.5">{newSeoDesc || newSummary || "Mô tả xuất hiện trên kết quả tìm kiếm..."}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addNews} className="h-9 rounded-full bg-[#1557B0] text-white text-sm"><Save className="w-4 h-4 mr-1" />Lưu bài viết</Button>
                        <Button onClick={() => setAddingNews(false)} variant="outline" className="h-9 rounded-full text-sm">Huỷ</Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {filteredNews.map(article => (
                      <div key={article.id} className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#EFF5FF] rounded-xl flex items-center justify-center shrink-0">
                          <Newspaper className="w-5 h-5 text-[#1557B0]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-[#0F1B2D] truncate">{article.title}</p>
                            <span className="text-[10px] bg-[#EFF5FF] text-[#1557B0] px-2 py-0.5 rounded-full font-semibold">{article.category}</span>
                          </div>
                          <p className="text-xs text-[#4A5868] mt-0.5 line-clamp-2">{article.summary}</p>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <p className="text-xs text-[#7D9E94]">{article.date}</p>
                            {article.tags && <p className="text-xs text-[#7D9E94]"><Tag className="w-3 h-3 inline mr-0.5" />{article.tags}</p>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => togglePublish(article.id)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${article.published ? "bg-[#EFF5FF] text-[#1557B0]" : "bg-[#F4F6F8] text-[#7D9E94]"}`}
                          >
                            {article.published ? "Đã đăng" : "Bản nháp"}
                          </button>
                          <button onClick={() => deleteNews(article.id)} className="text-[#7D9E94] hover:text-red-500 transition-colors p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredNews.length === 0 && (
                      <div className="text-center py-12 text-[#7D9E94]">Không tìm thấy bài viết nào.</div>
                    )}
                  </div>
                </div>
              )}

              {/* ---- EVENTS MANAGEMENT ---- */}
              {marketingSection === "events" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1557B0]">Sự kiện ({filteredEvents.length})</h3>
                    <Button onClick={() => setAddingEvent(true)} className="h-9 rounded-full bg-[#ed8302] hover:bg-[#d47200] text-white text-sm px-4">
                      <Plus className="w-4 h-4 mr-1" /> Thêm sự kiện
                    </Button>
                  </div>

                  <div className="flex gap-2 flex-wrap items-center">
                    <div className="relative flex-1 min-w-[180px]">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7D9E94]" />
                      <Input value={eventSearch} onChange={e => setEventSearch(e.target.value)} placeholder="Tìm kiếm sự kiện..." className="h-9 pl-9 rounded-xl border-[#E5EAF0] text-sm" />
                    </div>
                    <select value={eventStatusFilter} onChange={e => setEventStatusFilter(e.target.value)} className="h-9 text-xs border border-[#E5EAF0] rounded-xl px-3 text-[#0F1B2D] bg-white">
                      <option value="all">Tất cả trạng thái</option>
                      <option value="upcoming">Sắp diễn ra</option>
                      <option value="ongoing">Đang diễn ra</option>
                      <option value="ended">Đã kết thúc</option>
                    </select>
                  </div>

                  {addingEvent && (
                    <div className="bg-white rounded-2xl border-2 border-[#1557B0] p-6 shadow-sm space-y-4">
                      <h4 className="font-bold text-[#1557B0]">Sự kiện mới</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 md:col-span-2">
                          <Label className="text-[#1557B0] text-sm font-semibold">Tên sự kiện *</Label>
                          <Input value={evtName} onChange={e => setEvtName(e.target.value)} placeholder="Tên sự kiện..." className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <Label className="text-[#1557B0] text-sm font-semibold">Mô tả ngắn</Label>
                          <Textarea value={evtSummary} onChange={e => setEvtSummary(e.target.value)} rows={2} className="rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Ngày bắt đầu</Label>
                          <Input value={evtStart} onChange={e => setEvtStart(e.target.value)} placeholder="DD/MM/YYYY" className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Ngày kết thúc</Label>
                          <Input value={evtEnd} onChange={e => setEvtEnd(e.target.value)} placeholder="DD/MM/YYYY" className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Địa điểm</Label>
                          <Input value={evtLocation} onChange={e => setEvtLocation(e.target.value)} placeholder="Địa điểm tổ chức..." className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-[#1557B0] text-sm font-semibold">Link Google Maps</Label>
                          <Input value={evtMap} onChange={e => setEvtMap(e.target.value)} placeholder="https://maps.google.com/..." className="h-10 rounded-xl border-[#E5EAF0]" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={addEvent} className="h-9 rounded-full bg-[#1557B0] text-white text-sm"><Save className="w-4 h-4 mr-1" />Lưu sự kiện</Button>
                        <Button onClick={() => setAddingEvent(false)} variant="outline" className="h-9 rounded-full text-sm">Huỷ</Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {filteredEvents.map(evt => (
                      <div key={evt.id} className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#EFF5FF] rounded-xl flex items-center justify-center shrink-0">
                          <CalendarDays className="w-5 h-5 text-[#1557B0]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-[#0F1B2D]">{evt.name}</p>
                            {eventStatusBadge(evt.status)}
                          </div>
                          <p className="text-xs text-[#4A5868] mt-0.5 line-clamp-2">{evt.summary}</p>
                          <div className="flex items-center gap-3 mt-1 flex-wrap text-xs text-[#7D9E94]">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{evt.startDate}{evt.endDate && evt.endDate !== evt.startDate ? ` – ${evt.endDate}` : ""}</span>
                            {evt.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{evt.location}</span>}
                            <span className="flex items-center gap-1"><Users2 className="w-3 h-3" />{evt.registrations} đăng ký</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleEventPublish(evt.id)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${evt.published ? "bg-[#EFF5FF] text-[#1557B0]" : "bg-[#F4F6F8] text-[#7D9E94]"}`}
                          >
                            {evt.published ? "Đã đăng" : "Bản nháp"}
                          </button>
                          <button className="text-[#7D9E94] hover:text-[#1557B0] p-1 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteEvent(evt.id)} className="text-[#7D9E94] hover:text-red-500 transition-colors p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {filteredEvents.length === 0 && (
                      <div className="text-center py-12 text-[#7D9E94]">Không tìm thấy sự kiện nào.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ====================== CUSTOMERS TAB ====================== */}
          {tab === "customers" && !selectedCustomer && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#1557B0]">Quản lý Khách hàng</h1>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Tổng khách hàng", value: customers.length.toString(), icon: Users, color: "bg-[#EFF5FF] text-[#1557B0]" },
                  { label: "Đang hoạt động", value: customers.filter(c => c.status === "active").length.toString(), icon: CheckCircle2, color: "bg-[#EFF5FF] text-[#1557B0]" },
                  { label: "Hết hạn", value: customers.filter(c => c.status === "expired").length.toString(), icon: AlertTriangle, color: "bg-red-50 text-red-500" },
                  { label: "Chờ duyệt chứng nhận", value: customers.reduce((acc, c) => acc + c.certs.filter(cert => cert.status === "pending").length, 0).toString(), icon: Clock, color: "bg-[#fef3e2] text-[#ed8302]" },
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
                <div className="p-5 border-b border-[#E5EAF0] flex flex-wrap items-center gap-3">
                  <h3 className="font-bold text-[#1557B0] flex-1">Danh sách khách hàng</h3>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7D9E94]" />
                    <Input value={customerSearch} onChange={e => setCustomerSearch(e.target.value)} placeholder="Tìm kiếm..." className="h-9 pl-9 rounded-xl border-[#E5EAF0] w-48 text-sm" />
                  </div>
                  <select value={customerStatusFilter} onChange={e => setCustomerStatusFilter(e.target.value)} className="h-9 text-xs border border-[#E5EAF0] rounded-xl px-3 text-[#0F1B2D] bg-white">
                    <option value="all">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="expired">Hết hạn</option>
                    <option value="trial">Dùng thử</option>
                  </select>
                </div>
                <div className="divide-y divide-[#F4F6F8]">
                  {filteredCustomers.map(customer => (
                    <div
                      key={customer.id}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-[#FAFBFC] cursor-pointer transition-colors"
                      onClick={() => { setSelectedCustomer(customer); setCustomerDetailTab("info"); }}
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
                      <ChevronRight className="w-4 h-4 text-[#7D9E94] shrink-0" />
                    </div>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <div className="text-center py-12 text-[#7D9E94]">Không tìm thấy khách hàng nào.</div>
                  )}
                </div>
              </div>

              {/* Reports Section */}
              <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#1557B0] flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Báo cáo thống kê</h3>
                  <select value={reportPeriod} onChange={e => setReportPeriod(e.target.value)} className="h-9 text-xs border border-[#E5EAF0] rounded-xl px-3 text-[#0F1B2D] bg-white">
                    <option value="week">7 ngày qua</option>
                    <option value="month">Tháng này</option>
                    <option value="quarter">Quý này</option>
                    <option value="year">Năm nay</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: "Doanh thu", value: "39.2M đ", sub: "+12% so với kỳ trước", icon: DollarSign, color: "text-[#1557B0]" },
                    { label: "Gói đã bán", value: "4 gói", sub: "2 Pro, 1 Growth, 1 Enterprise", icon: Package, color: "text-[#ed8302]" },
                    { label: "Lượt truy cập", value: "8.942", sub: "+5% so với kỳ trước", icon: Globe, color: "text-[#1557B0]" },
                    { label: "Hóa đơn chờ", value: "1 HĐ", sub: "Cần xác nhận thanh toán", icon: Receipt, color: "text-red-500" },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-4">
                      <div className={`w-8 h-8 rounded-lg bg-[#EFF5FF] flex items-center justify-center mb-2 ${s.color}`}>
                        <s.icon className="w-4 h-4" />
                      </div>
                      <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-xs text-[#7D9E94] mt-0.5">{s.label}</p>
                      <p className="text-[10px] text-[#7D9E94] mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#E5EAF0] text-xs font-semibold text-[#4A5868] hover:border-[#1557B0] hover:text-[#1557B0] transition-colors">
                    <Download className="w-3.5 h-3.5" /> Tải báo cáo
                  </button>
                  <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#E5EAF0] text-xs font-semibold text-[#4A5868] hover:border-[#1557B0] hover:text-[#1557B0] transition-colors">
                    <Printer className="w-3.5 h-3.5" /> In báo cáo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ====================== CUSTOMER DETAIL ====================== */}
          {tab === "customers" && selectedCustomer && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="flex items-center gap-1.5 text-sm text-[#7D9E94] hover:text-[#1557B0] font-semibold transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Danh sách khách hàng
                </button>
                <span className="text-[#E5EAF0]">/</span>
                <span className="text-sm font-semibold text-[#0F1B2D]">{selectedCustomer.name}</span>
              </div>

              {/* Customer Header */}
              <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 shadow-sm">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="w-14 h-14 rounded-2xl bg-[#1557B0] text-white flex items-center justify-center text-xl font-bold shrink-0">
                    {selectedCustomer.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-[#0F1B2D]">{selectedCustomer.name}</h2>
                      {statusBadge(selectedCustomer.status)}
                    </div>
                    <p className="text-sm text-[#4A5868]">{selectedCustomer.company}</p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap text-xs text-[#7D9E94]">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{selectedCustomer.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{selectedCustomer.phone}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{selectedCustomer.region}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 h-9 px-4 rounded-full border border-[#E5EAF0] text-xs font-semibold text-[#4A5868] hover:border-[#1557B0] hover:text-[#1557B0] transition-colors">
                      <LayoutDashboard className="w-3.5 h-3.5" /> Xem Dashboard KH
                    </button>
                  </div>
                </div>
              </div>

              {/* Detail Tabs */}
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { key: "info" as CustomerDetailTab, label: "Thông tin", icon: User },
                  { key: "plan" as CustomerDetailTab, label: "Gói dịch vụ", icon: Package },
                  { key: "payment" as CustomerDetailTab, label: "Thanh toán", icon: CreditCard },
                  { key: "usage" as CustomerDetailTab, label: "Sử dụng", icon: BarChart3 },
                  { key: "support" as CustomerDetailTab, label: "Hỗ trợ", icon: MessageSquare },
                  { key: "notes" as CustomerDetailTab, label: "Ghi chú", icon: StickyNote },
                  { key: "renewal" as CustomerDetailTab, label: "Gia hạn & Upsell", icon: Bell },
                  { key: "contract" as CustomerDetailTab, label: "Hợp đồng & HĐ", icon: FileText },
                ].map(t => (
                  <button key={t.key} onClick={() => setCustomerDetailTab(t.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${customerDetailTab === t.key ? "bg-[#1557B0] text-white border-[#1557B0]" : "border-[#E5EAF0] text-[#4A5868] hover:border-[#1557B0] hover:text-[#1557B0]"}`}>
                    <t.icon className="w-3.5 h-3.5" /> {t.label}
                  </button>
                ))}
              </div>

              {/* INFO TAB */}
              {customerDetailTab === "info" && (
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm space-y-4">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2"><User className="w-4 h-4" /> Thông tin cơ bản</h4>
                    {[
                      { label: "Họ tên", value: selectedCustomer.name, icon: User },
                      { label: "Email", value: selectedCustomer.email, icon: Mail },
                      { label: "Điện thoại", value: selectedCustomer.phone, icon: Phone },
                      { label: "Công ty", value: selectedCustomer.company, icon: Building2 },
                      { label: "Địa chỉ", value: selectedCustomer.address, icon: MapPin },
                      { label: "Khu vực", value: selectedCustomer.region, icon: Globe },
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                          <f.icon className="w-4 h-4 text-[#1557B0]" />
                        </div>
                        <div>
                          <p className="text-xs text-[#7D9E94]">{f.label}</p>
                          <p className="font-semibold text-sm text-[#0F1B2D]">{f.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><BadgeCheck className="w-4 h-4" /> Chứng nhận</h4>
                    {selectedCustomer.certs.length === 0 ? (
                      <p className="text-sm text-[#7D9E94] italic">Chưa có chứng nhận.</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedCustomer.certs.map(cert => (
                          <div key={cert.id} className="flex items-center gap-3 bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-3">
                            <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-[#1557B0]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#0F1B2D]">{cert.name}</p>
                              <p className="text-xs text-[#7D9E94] truncate">{cert.fileName}</p>
                            </div>
                            {certBadge(cert.status)}
                            {cert.status === "pending" && (
                              <div className="flex gap-1.5 shrink-0">
                                <button onClick={() => verifyCert(selectedCustomer.id, cert.id, "valid")}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#EFF5FF] text-[#1557B0] text-xs font-semibold hover:bg-[#DCEEFF] transition-colors">
                                  <CheckCircle2 className="w-3 h-3" /> Duyệt
                                </button>
                                <button onClick={() => verifyCert(selectedCustomer.id, cert.id, "rejected")}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors">
                                  <XCircle className="w-3 h-3" /> Từ chối
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

              {/* PLAN TAB */}
              {customerDetailTab === "plan" && (
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><Package className="w-4 h-4" /> Thông tin gói dịch vụ</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Tên gói", value: selectedCustomer.plan },
                        { label: "Ngày mua", value: selectedCustomer.purchaseDate },
                        { label: "Ngày hết hạn", value: selectedCustomer.planExpiry },
                        { label: "Chu kỳ thanh toán", value: selectedCustomer.billingCycle === "yearly" ? "Hàng năm" : "Hàng tháng" },
                        { label: "Trạng thái", value: statusBadge(selectedCustomer.status) },
                        { label: "Lần hoạt động cuối", value: selectedCustomer.lastActivity },
                      ].map((f, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#F4F6F8] last:border-0">
                          <span className="text-sm text-[#7D9E94]">{f.label}</span>
                          <span className="text-sm font-semibold text-[#0F1B2D]">{typeof f.value === "string" ? f.value : f.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><TrendingUp className="w-4 h-4" /> Lịch sử gói</h4>
                    {selectedCustomer.planHistory.length === 0 ? (
                      <p className="text-sm text-[#7D9E94] italic">Chưa có lịch sử thay đổi gói.</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedCustomer.planHistory.map((h, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-[#FAFBFC] rounded-xl border border-[#E5EAF0]">
                            <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                              <ArrowUpRight className="w-4 h-4 text-[#1557B0]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#0F1B2D]">{h.from} → {h.to}</p>
                              <p className="text-xs text-[#7D9E94]">{h.date} · {h.action === "upgrade" ? "Nâng gói" : h.action === "downgrade" ? "Hạ gói" : "Gia hạn"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAYMENT TAB */}
              {customerDetailTab === "payment" && (
                <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-[#E5EAF0]">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2"><CreditCard className="w-4 h-4" /> Lịch sử thanh toán</h4>
                    <p className="text-xs text-[#7D9E94] mt-0.5">Admin xác nhận trạng thái thanh toán, gửi phản hồi về tài khoản khách.</p>
                  </div>
                  <div className="divide-y divide-[#F4F6F8]">
                    {selectedCustomer.paymentHistory.map(p => (
                      <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                        <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                          <Receipt className="w-4 h-4 text-[#1557B0]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#0F1B2D]">{p.amount}</p>
                          <p className="text-xs text-[#7D9E94]">{p.date} · {p.method}</p>
                        </div>
                        {paymentBadge(p.status)}
                        {p.status === "pending" && (
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => confirmPayment(selectedCustomer.id, p.id, "paid")}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#EFF5FF] text-[#1557B0] text-xs font-semibold hover:bg-[#DCEEFF] transition-colors">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Xác nhận đã TT
                            </button>
                            <button
                              onClick={() => confirmPayment(selectedCustomer.id, p.id, "failed")}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 transition-colors">
                              <XCircle className="w-3.5 h-3.5" /> Chưa thanh toán
                            </button>
                          </div>
                        )}
                        <div className="flex gap-1.5 shrink-0">
                          <button className="p-1.5 rounded-lg border border-[#E5EAF0] text-[#7D9E94] hover:text-[#1557B0] hover:border-[#1557B0] transition-colors">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg border border-[#E5EAF0] text-[#7D9E94] hover:text-[#1557B0] hover:border-[#1557B0] transition-colors">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg border border-[#E5EAF0] text-[#7D9E94] hover:text-[#1557B0] hover:border-[#1557B0] transition-colors">
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {selectedCustomer.paymentHistory.length === 0 && (
                      <p className="text-sm text-[#7D9E94] italic p-5">Chưa có lịch sử thanh toán.</p>
                    )}
                  </div>
                </div>
              )}

              {/* USAGE TAB */}
              {customerDetailTab === "usage" && (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                      <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><BarChart3 className="w-4 h-4" /> Mức độ sử dụng</h4>
                      <div className="space-y-4">
                        {[
                          { label: "Sản phẩm (SKU)", used: selectedCustomer.productsCount, limit: selectedCustomer.planLimit },
                          { label: "Mã QR đã tạo", used: selectedCustomer.qrActivated, limit: selectedCustomer.qrLimit },
                        ].map((u, i) => {
                          const pct = Math.min(Math.round((u.used / u.limit) * 100), 100);
                          return (
                            <div key={i}>
                              <div className="flex justify-between text-sm mb-1.5">
                                <span className="font-semibold text-[#0F1B2D]">{u.label}</span>
                                <span className="text-[#7D9E94]">{u.used} / {u.limit}</span>
                              </div>
                              <div className="h-2.5 bg-[#F4F6F8] rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all ${pct >= 90 ? "bg-red-400" : pct >= 70 ? "bg-[#ed8302]" : "bg-gradient-to-r from-[#4A8FE0] to-[#1557B0]"}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <p className="text-xs text-[#7D9E94] mt-1">{pct}% đã dùng</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                      <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><Activity className="w-4 h-4" /> Thông tin hoạt động</h4>
                      <div className="space-y-3">
                        {[
                          { label: "Lần hoạt động cuối", value: selectedCustomer.lastActivity },
                          { label: "Sản phẩm đã tạo", value: `${selectedCustomer.productsCount} SKU` },
                          { label: "Mã QR đã kích hoạt", value: `${selectedCustomer.qrActivated} mã` },
                          { label: "Tính năng đang dùng", value: "Truy xuất nguồn gốc, QR Code, Dashboard" },
                        ].map((f, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-[#F4F6F8] last:border-0">
                            <span className="text-sm text-[#7D9E94]">{f.label}</span>
                            <span className="text-sm font-semibold text-[#0F1B2D]">{f.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#1557B0] flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Dashboard khách hàng</h4>
                      <button className="flex items-center gap-1.5 h-9 px-4 rounded-full border border-[#1557B0] text-[#1557B0] text-xs font-semibold hover:bg-[#EFF5FF] transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Truy cập Dashboard
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Sản phẩm đã tạo", value: selectedCustomer.productsCount, icon: Package },
                        { label: "Mã QR đã tạo", value: selectedCustomer.qrActivated, icon: QrCode },
                        { label: "Chứng nhận hợp lệ", value: selectedCustomer.certs.filter(c => c.status === "valid").length, icon: BadgeCheck },
                      ].map((s, i) => (
                        <div key={i} className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-3 text-center">
                          <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center mx-auto mb-2">
                            <s.icon className="w-4 h-4 text-[#1557B0]" />
                          </div>
                          <p className="text-lg font-bold text-[#0F1B2D]">{s.value}</p>
                          <p className="text-xs text-[#7D9E94]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUPPORT TAB */}
              {customerDetailTab === "support" && (
                <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-[#E5EAF0]">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Lịch sử hỗ trợ</h4>
                  </div>
                  <div className="divide-y divide-[#F4F6F8]">
                    {selectedCustomer.supportTickets.map(t => (
                      <div key={t.id} className="flex items-center gap-4 px-5 py-4">
                        <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-[#1557B0]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#0F1B2D]">{t.subject}</p>
                          <p className="text-xs text-[#7D9E94]">{t.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {ticketPriorityBadge(t.priority)}
                          {ticketStatusBadge(t.status)}
                        </div>
                      </div>
                    ))}
                    {selectedCustomer.supportTickets.length === 0 && (
                      <p className="text-sm text-[#7D9E94] italic p-5">Chưa có yêu cầu hỗ trợ.</p>
                    )}
                  </div>
                </div>
              )}

              {/* NOTES TAB */}
              {customerDetailTab === "notes" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-3"><StickyNote className="w-4 h-4" /> Thêm ghi chú nội bộ</h4>
                    <Textarea
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      rows={3}
                      placeholder="Nhập ghi chú của bạn..."
                      className="rounded-xl border-[#E5EAF0] text-sm mb-3"
                    />
                    <Button onClick={() => addNote(selectedCustomer.id)} disabled={!newNote.trim()} className="h-9 rounded-full bg-[#1557B0] text-white text-sm">
                      <Save className="w-4 h-4 mr-1" /> Lưu ghi chú
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {selectedCustomer.notes.map(note => (
                      <div key={note.id} className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-7 h-7 bg-[#1557B0] text-white rounded-full flex items-center justify-center text-xs font-bold">{note.author[0]}</div>
                          <span className="text-sm font-semibold text-[#0F1B2D]">{note.author}</span>
                          <span className="text-xs text-[#7D9E94]">· {note.date}</span>
                        </div>
                        <p className="text-sm text-[#4A5868]">{note.content}</p>
                      </div>
                    ))}
                    {selectedCustomer.notes.length === 0 && (
                      <p className="text-sm text-[#7D9E94] italic text-center py-6">Chưa có ghi chú nào.</p>
                    )}
                  </div>
                </div>
              )}

              {/* RENEWAL TAB */}
              {customerDetailTab === "renewal" && (
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><Bell className="w-4 h-4" /> Nhắc gia hạn</h4>
                    <div className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-4 mb-4">
                      <p className="text-xs text-[#7D9E94]">Ngày hết hạn gói</p>
                      <p className="text-xl font-bold text-[#0F1B2D] mt-0.5">{selectedCustomer.planExpiry}</p>
                      <p className="text-xs text-[#ed8302] mt-1 font-semibold">
                        Nhắc trước {selectedCustomer.renewalReminderDays} ngày
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#4A5868]">Nhắc trước (ngày)</label>
                      <Input type="number" defaultValue={selectedCustomer.renewalReminderDays} className="h-10 rounded-xl border-[#E5EAF0]" />
                    </div>
                    <Button className="mt-3 h-9 rounded-full bg-[#1557B0] text-white text-sm w-full">
                      <Bell className="w-4 h-4 mr-1" /> Lưu cài đặt nhắc nhở
                    </Button>
                  </div>
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><ArrowUpRight className="w-4 h-4" /> Đề xuất nâng gói</h4>
                    <div className="space-y-3">
                      {[
                        { plan: "Chuyên nghiệp", price: "9.600.000 đ/năm", features: ["100 SKU", "2.000 QR", "API tích hợp"] },
                        { plan: "Doanh nghiệp", price: "24.000.000 đ/năm", features: ["500 SKU", "10.000 QR", "Custom domain", "SLA 99.9%"] },
                      ].filter(p => p.plan !== selectedCustomer.plan).map((p, i) => (
                        <div key={i} className="border border-[#E5EAF0] rounded-xl p-4 hover:border-[#1557B0] transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-[#0F1B2D]">{p.plan}</span>
                            <span className="text-xs font-semibold text-[#1557B0]">{p.price}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {p.features.map((f, j) => (
                              <span key={j} className="text-[10px] bg-[#EFF5FF] text-[#1557B0] px-2 py-0.5 rounded-full font-semibold">{f}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTRACT TAB */}
              {customerDetailTab === "contract" && (
                <div className="space-y-5">
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><FileText className="w-4 h-4" /> Hợp đồng điện tử</h4>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      {[
                        { label: "Ngày ký hợp đồng", value: selectedCustomer.contractSignDate },
                        { label: "Ngày hết hạn HĐ", value: selectedCustomer.contractExpiry },
                        { label: "Trạng thái", value: selectedCustomer.status === "active" ? "Có hiệu lực" : "Hết hạn" },
                      ].map((f, i) => (
                        <div key={i} className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-3">
                          <p className="text-xs text-[#7D9E94]">{f.label}</p>
                          <p className="font-semibold text-sm text-[#0F1B2D] mt-0.5">{f.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#FAFBFC] rounded-xl border border-[#E5EAF0] p-4 mb-4">
                      <p className="text-xs text-[#7D9E94] mb-3">Nội dung hợp đồng</p>
                      <div className="h-32 bg-white rounded-lg border border-[#E5EAF0] flex items-center justify-center">
                        <div className="text-center text-[#7D9E94]">
                          <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                          <p className="text-sm">HỢP ĐỒNG DỊCH VỤ CHECKEE</p>
                          <p className="text-xs mt-0.5">Số: HĐ-{selectedCustomer.id.toUpperCase()}-2026</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#1557B0] text-[#1557B0] text-xs font-semibold hover:bg-[#EFF5FF] transition-colors">
                        <Eye className="w-3.5 h-3.5" /> Xem
                      </button>
                      <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#E5EAF0] text-[#4A5868] text-xs font-semibold hover:border-[#1557B0] hover:text-[#1557B0] transition-colors">
                        <Download className="w-3.5 h-3.5" /> Tải xuống
                      </button>
                      <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#E5EAF0] text-[#4A5868] text-xs font-semibold hover:border-[#1557B0] hover:text-[#1557B0] transition-colors">
                        <Printer className="w-3.5 h-3.5" /> In
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E5EAF0] p-5 shadow-sm">
                    <h4 className="font-bold text-[#1557B0] flex items-center gap-2 mb-4"><Receipt className="w-4 h-4" /> Hóa đơn điện tử</h4>
                    <div className="space-y-3">
                      {selectedCustomer.paymentHistory.filter(p => p.status === "paid").map((p, i) => (
                        <div key={p.id} className="flex items-center gap-4 p-3 bg-[#FAFBFC] rounded-xl border border-[#E5EAF0]">
                          <div className="w-8 h-8 bg-[#EFF5FF] rounded-lg flex items-center justify-center shrink-0">
                            <Receipt className="w-4 h-4 text-[#1557B0]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#0F1B2D]">Hóa đơn #{String(i + 1).padStart(4, "0")} · {p.amount}</p>
                            <p className="text-xs text-[#7D9E94]">{p.date} · {p.method}</p>
                          </div>
                          <div className="flex gap-1.5">
                            <button className="p-1.5 rounded-lg border border-[#E5EAF0] text-[#7D9E94] hover:text-[#1557B0] hover:border-[#1557B0] transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded-lg border border-[#E5EAF0] text-[#7D9E94] hover:text-[#1557B0] hover:border-[#1557B0] transition-colors"><Download className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 rounded-lg border border-[#E5EAF0] text-[#7D9E94] hover:text-[#1557B0] hover:border-[#1557B0] transition-colors"><Printer className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                      {selectedCustomer.paymentHistory.filter(p => p.status === "paid").length === 0 && (
                        <p className="text-sm text-[#7D9E94] italic">Chưa có hóa đơn.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ====================== JOURNEY TAB ====================== */}
          {tab === "journey" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-xl font-bold text-[#1557B0]">Hành trình Khách hàng</h1>
                  <p className="text-sm text-[#7D9E94] mt-0.5">Theo dõi từng bước — xác định điểm nghẽn để Sale tư vấn kịp thời.</p>
                </div>
                <div className="flex gap-1.5">
                  {[
                    { key: "leads" as const, label: "Leads cần gọi", icon: Phone },
                    { key: "funnel" as const, label: "Phễu chuyển đổi", icon: TrendingUp },
                    { key: "timeline" as const, label: "Lịch sử sự kiện", icon: Activity },
                  ].map(v => (
                    <button key={v.key} onClick={() => setJourneyViewMode(v.key)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${journeyViewMode === v.key ? "bg-[#1557B0] text-white border-[#1557B0]" : "border-[#E5EAF0] text-[#4A5868] hover:border-[#1557B0] hover:text-[#1557B0]"}`}>
                      <v.icon className="w-3.5 h-3.5" /> {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* === LEADS VIEW === */}
              {journeyViewMode === "leads" && (
                <div className="space-y-5">
                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Tổng phiên", value: uniqueSessions.length.toString(), icon: Activity, color: "bg-[#EFF5FF] text-[#1557B0]" },
                      { label: "Có thông tin liên hệ", value: sessionLeads.filter(l => l.phone !== "—").length.toString(), icon: Phone, color: "bg-[#EFF5FF] text-[#1557B0]" },
                      { label: "Đang bị vướng", value: stuckLeads.length.toString(), icon: AlertTriangle, color: "bg-[#fef3e2] text-[#ed8302]" },
                      { label: "Đã chuyển đổi", value: sessionLeads.filter(l => l.completed).length.toString(), icon: CheckCircle2, color: "bg-[#EFF5FF] text-[#1557B0]" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-[#E5EAF0] p-4 shadow-sm">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${s.color}`}>
                          <s.icon className="w-4 h-4" />
                        </div>
                        <p className="text-2xl font-bold text-[#0F1B2D]">{s.value}</p>
                        <p className="text-xs text-[#7D9E94] mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stuck Leads - priority section */}
                  {stuckLeads.length > 0 && (
                    <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                      <div className="p-5 border-b border-[#E5EAF0] bg-[#fef3e2]">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-[#ed8302]" />
                          <h3 className="font-bold text-[#ed8302]">Khách đang bị vướng — Cần gọi tư vấn</h3>
                          <span className="text-xs bg-[#ed8302] text-white px-2 py-0.5 rounded-full font-bold">{stuckLeads.length}</span>
                        </div>
                        <p className="text-xs text-[#4A5868] mt-1">Những khách đã điền thông tin bước 1 nhưng chưa hoàn thành. Số điện thoại và tên doanh nghiệp đã được ghi lại.</p>
                      </div>
                      <div className="divide-y divide-[#F4F6F8]">
                        {stuckLeads.map(lead => (
                          <div key={lead.sessionId} className="flex items-center gap-4 px-5 py-4">
                            <div className="w-9 h-9 rounded-full bg-[#fef3e2] text-[#ed8302] flex items-center justify-center shrink-0 font-bold text-sm">
                              {lead.userName?.[0] || "K"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-[#0F1B2D]">{lead.userName}</p>
                              {lead.company !== "—" && <p className="text-xs text-[#1557B0] font-semibold">{lead.company}</p>}
                              <p className="text-xs text-[#7D9E94] mt-0.5 font-mono">{lead.sessionId.slice(0, 20)}…</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-[#7D9E94]">Đang dừng tại</p>
                              <p className="text-xs font-semibold text-[#ed8302]">{lead.lastStep}</p>
                            </div>
                            {lead.phone !== "—" && (
                              <a href={`tel:${lead.phone}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1557B0] text-white text-xs font-semibold hover:bg-[#0D3F8A] transition-colors shrink-0">
                                <Phone className="w-3.5 h-3.5" /> {lead.phone}
                              </a>
                            )}
                            {lead.time && (
                              <span className="text-xs text-[#7D9E94] shrink-0 whitespace-nowrap">{formatTime(lead.time)}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All leads */}
                  <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-[#E5EAF0]">
                      <h3 className="font-bold text-[#1557B0]">Tất cả phiên ({sessionLeads.length})</h3>
                    </div>
                    <div className="divide-y divide-[#F4F6F8]">
                      {sessionLeads.map(lead => (
                        <div key={lead.sessionId} className="flex items-center gap-4 px-5 py-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${lead.completed ? "bg-[#EFF5FF] text-[#1557B0]" : lead.stuck ? "bg-[#fef3e2] text-[#ed8302]" : "bg-[#F4F6F8] text-[#7D9E94]"}`}>
                            {lead.userName?.[0] || "K"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-sm text-[#0F1B2D]">{lead.userName}</p>
                              {lead.completed && <span className="text-[10px] bg-[#EFF5FF] text-[#1557B0] px-2 py-0.5 rounded-full font-bold border border-[#DCEEFF]">Đã chuyển đổi</span>}
                              {lead.stuck && <span className="text-[10px] bg-[#fef3e2] text-[#ed8302] px-2 py-0.5 rounded-full font-bold">Cần hỗ trợ</span>}
                            </div>
                            {lead.company !== "—" && <p className="text-xs text-[#1557B0] font-semibold">{lead.company}</p>}
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-[#0F1B2D]">{lead.lastStep}</p>
                            {lead.phone !== "—" && <p className="text-xs text-[#7D9E94]">{lead.phone}</p>}
                          </div>
                          {lead.time && <span className="text-xs text-[#7D9E94] shrink-0 whitespace-nowrap">{formatTime(lead.time)}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* === FUNNEL VIEW === */}
              {journeyViewMode === "funnel" && (
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
                              {dropOff > 0 && <span className="text-red-500 font-semibold">-{dropOff} rớt</span>}
                              <span className="font-bold text-[#1557B0]">{step.sessions} phiên</span>
                              <span className="text-[#7D9E94]">{pct}%</span>
                            </div>
                          </div>
                          <div className="h-2.5 bg-[#F4F6F8] rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#4A8FE0] to-[#0B2D8A] rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {funnelCounts.length > 1 && (() => {
                    let maxDrop = 0; let bottleneckStep = "";
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
                          <p className="text-xs text-[#4A5868] mt-0.5">{maxDrop} phiên bị rớt tại bước này. Sale nên chủ động tư vấn.</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* === TIMELINE VIEW === */}
              {journeyViewMode === "timeline" && (
                <div className="bg-white rounded-2xl border border-[#E5EAF0] shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-[#E5EAF0] flex items-center justify-between">
                    <h3 className="font-bold text-[#1557B0] flex items-center gap-2"><Activity className="w-4 h-4" /> Lịch sử sự kiện ({journeyEvents.length})</h3>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-[#7D9E94]" />
                      <select value={journeyFilter} onChange={e => setJourneyFilter(e.target.value)} className="text-xs border border-[#E5EAF0] rounded-lg px-2 py-1.5 text-[#0F1B2D] bg-white">
                        <option value="all">Tất cả phiên ({uniqueSessions.length})</option>
                        {uniqueSessions.map(sid => (
                          <option key={sid} value={sid}>{sid.slice(0, 20)}...</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="divide-y divide-[#F4F6F8] max-h-[520px] overflow-y-auto">
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
                            {event.meta && Object.entries(event.meta).filter(([k]) => k !== "roles").map(([k, v]) => (
                              <span key={k} className="text-[10px] bg-[#EFF5FF] text-[#1557B0] px-1.5 py-0.5 rounded font-semibold">{k}: {String(v)}</span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-[#7D9E94] shrink-0 whitespace-nowrap">{formatTime(event.timestamp)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
