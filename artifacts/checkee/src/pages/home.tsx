import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { TrialButton } from "@/components/ui/trial-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight, Calendar, ChevronLeft, ChevronRight, Quote,
  CheckCircle2, ShieldCheck, Globe, Zap, QrCode, BarChart3, Package
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const heroSlides = [
  {
    img: "/images/hero-bright-1.png",
    tag: "Truy xuất nguồn gốc",
    headline: "Minh bạch chuỗi cung ứng,",
    highlight: "nâng tầm thương hiệu Việt.",
    sub: "Checkee số hoá toàn bộ hành trình sản phẩm — từ vùng trồng đến tay người tiêu dùng — bằng một mã QR duy nhất.",
  },
  {
    img: "/images/hero-bright-2.png",
    tag: "Kết nối Cổng TXNG Quốc gia",
    headline: "Chuẩn hoá dữ liệu sản phẩm",
    highlight: "theo tiêu chuẩn GS1 / EPCIS.",
    sub: "Tích hợp trực tiếp với Cổng TXNG Quốc gia, kết nối chuỗi cung ứng liền mạch và chống hàng giả hiệu quả.",
  },
  {
    img: "/images/hero-bright-3.png",
    tag: "EU Digital Product Passport",
    headline: "Mở rộng thị trường xuất khẩu",
    highlight: "với Hộ chiếu sản phẩm số EU.",
    sub: "Đáp ứng yêu cầu ESPR 2024, giúp doanh nghiệp Việt tiếp cận thị trường châu Âu một cách bền vững.",
  },
];

const partnerLogos = [
  { name: "Vinamilk", domain: "vinamilk.com.vn", color: "#1557B0" },
  { name: "Vinasoy", domain: "vinasoy.com", color: "#1557B0" },
  { name: "Mobifone", domain: "mobifone.vn", color: "#1B4FA0" },
  { name: "Viettel", domain: "viettel.vn", color: "#E8472C" },
  { name: "TH True Milk", domain: "thmilk.vn", color: "#0E4A8A" },
  { name: "Highlands Coffee", domain: "highlandscoffee.com.vn", color: "#7A2E0E" },
  { name: "Phúc Long", domain: "phuclong.com.vn", color: "#1557B0" },
  { name: "Trung Nguyên", domain: "trungnguyenlegend.com", color: "#7A2E0E" },
  { name: "Sabeco", domain: "sabeco.com.vn", color: "#E8472C" },
  { name: "Habeco", domain: "habeco.com.vn", color: "#ed8302" },
  { name: "Bibica", domain: "bibica.com.vn", color: "#1557B0" },
  { name: "Acecook", domain: "acecookvietnam.com.vn", color: "#E8472C" },
  { name: "Masan", domain: "masangroup.com", color: "#1557B0" },
  { name: "PNJ", domain: "pnj.com.vn", color: "#C8A24A" },
  { name: "Vietjet Air", domain: "vietjetair.com", color: "#E8472C" },
  { name: "Vingroup", domain: "vingroup.net", color: "#1557B0" },
  { name: "Hoa Sen", domain: "hoasengroup.vn", color: "#fdba74" },
  { name: "Coca-Cola", domain: "cocacolavietnam.com", color: "#E8472C" },
  { name: "Nestlé", domain: "nestle.com.vn", color: "#0E4A8A" },
  { name: "Unilever", domain: "unilever.com.vn", color: "#1B4FA0" },
  { name: "PepsiCo", domain: "pepsico.com.vn", color: "#1B4FA0" },
];

const partnerRow1 = partnerLogos.slice(0, 7);
const partnerRow2 = partnerLogos.slice(7, 14);
const partnerRow3 = partnerLogos.slice(14, 21);

const solutions = [
  {
    img: "/images/hero-tea.png",
    tag: "TT 02/2024",
    title: "Checkee Trace",
    desc: "Truy xuất nguồn gốc điện tử chuẩn GS1/EPCIS — minh bạch toàn bộ chuỗi cung ứng từ vùng trồng đến tay người tiêu dùng.",
    href: "/trace",
  },
  {
    img: "/images/hero-factory.png",
    tag: "NĐ 43/2017",
    title: "Checkee E-label",
    desc: "Nhãn điện tử đa ngôn ngữ — hiển thị thành phần, dinh dưỡng, hướng dẫn sử dụng theo từng thị trường xuất khẩu.",
    href: "/e-label",
  },
  {
    img: "/images/hero-lacquer.png",
    tag: "EU ESPR 2024",
    title: "Checkee DPP",
    desc: "Hộ chiếu sản phẩm số — đáp ứng quy định Digital Product Passport của Liên minh châu Âu cho thời trang, điện tử, pin.",
    href: "/dpp",
  },
  {
    img: "/images/hero-rice.png",
    tag: "NĐ 15/2018",
    title: "Checkee F&B",
    desc: "Lưu mẫu thức ăn số hoá cho nhà hàng, khách sạn, bếp ăn — tuân thủ ATTP, sẵn sàng đối chiếu khi cần.",
    href: "/fnb",
  },
];

const whyItems = [
  { icon: QrCode, label: "Mã QR thông minh", desc: "Mỗi sản phẩm một mã định danh duy nhất, chống giả mạo." },
  { icon: Globe, label: "Kết nối toàn cầu", desc: "Tích hợp Cổng TXNG Quốc gia và chuẩn GS1/EPCIS quốc tế." },
  { icon: ShieldCheck, label: "Bảo mật & Tuân thủ", desc: "Đáp ứng TT 02/2024, NĐ 43/2017 và EU ESPR 2024." },
  { icon: BarChart3, label: "Phân tích dữ liệu", desc: "Dashboard thời gian thực theo dõi lượt quét và vị trí." },
  { icon: Package, label: "Quản lý đa SKU", desc: "Quản lý hàng trăm dòng sản phẩm trên một nền tảng." },
  { icon: Zap, label: "Triển khai nhanh", desc: "Từ đăng ký đến in QR đầu tiên chỉ trong 7 ngày làm việc." },
];

/* ─── Components ─────────────────────────────────────────────────────────── */

function PartnerLogo({ domain, name, color }: { domain: string; name: string; color: string }) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  if (step === 2) {
    return <span className="font-extrabold text-base tracking-tight text-center leading-tight" style={{ color }}>{name}</span>;
  }
  const src = step === 0
    ? `https://unavatar.io/${domain}?fallback=false`
    : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  return (
    <img src={src} alt={name} onError={() => setStep(s => (s === 0 ? 1 : 2))}
      className="max-h-14 max-w-[150px] object-contain" loading="lazy" />
  );
}

function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => { emblaApi.off("select", onSelect); clearInterval(interval); };
  }, [emblaApi]);

  const slide = heroSlides[selectedIndex];

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Slider track (hidden, drives index only) */}
      <div className="sr-only" ref={emblaRef} aria-hidden>
        <div className="flex">
          {heroSlides.map((_, i) => <div key={i} className="flex-[0_0_100%]" />)}
        </div>
      </div>

      {/* Actual hero layout — 2-column split */}
      <div className="container max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[88vh] items-center py-20 lg:py-0">

          {/* Left: Text */}
          <div className="flex flex-col justify-center pt-28 pb-16 lg:pt-0 lg:pb-0 lg:pr-14 order-2 lg:order-1">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-[#EFF5FF] border border-[#DCEEFF] rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1557B0] animate-pulse" />
                <span className="text-[#1557B0] text-xs font-bold uppercase tracking-widest">{slide.tag}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F1B2D] leading-[1.08] tracking-tight">
                {slide.headline}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1557B0] to-[#4A8FE0]">
                  {slide.highlight}
                </span>
              </h1>

              <p className="text-[#4A5868] text-lg lg:text-xl leading-relaxed max-w-xl">
                {slide.sub}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <TrialButton size="large" />
                <a href="#solutions">
                  <Button variant="outline"
                    className="rounded-full border-2 border-[#1557B0] text-[#1557B0] hover:bg-[#1557B0] hover:text-white px-8 py-4 h-auto font-semibold transition-all">
                    Khám phá giải pháp
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-8 border-t border-[#E5EAF0] mt-4">
                <div>
                  <div className="text-3xl font-bold text-[#1557B0]">5,000<span className="text-[#ed8302]">+</span></div>
                  <div className="text-xs uppercase tracking-widest text-[#7D9E94] mt-1">Sản phẩm định danh</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#1557B0]">1,234<span className="text-[#ed8302]">+</span></div>
                  <div className="text-xs uppercase tracking-widest text-[#7D9E94] mt-1">Doanh nghiệp tin dùng</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#1557B0]">99<span className="text-[#ed8302]">%</span></div>
                  <div className="text-xs uppercase tracking-widest text-[#7D9E94] mt-1">Uptime SLA</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Image */}
          <div className="relative order-1 lg:order-2 flex items-center justify-end h-full min-h-[380px] lg:min-h-[88vh]">
            <motion.div
              key={`img-${selectedIndex}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full absolute inset-0"
            >
              <img
                src={slide.img}
                alt="Checkee"
                className="w-full h-full object-cover"
              />
              {/* Gradient blend on left edge so text panel merges cleanly */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:from-white/0" />
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/30 to-transparent" />
            </motion.div>

            {/* Floating QR badge */}
            <div className="absolute bottom-10 left-4 lg:left-auto lg:right-6 z-10 bg-white rounded-2xl shadow-xl border border-[#E5EAF0] p-4 flex items-center gap-3 max-w-[240px]">
              <div className="w-12 h-12 bg-[#EFF5FF] rounded-xl flex items-center justify-center shrink-0">
                <QrCode className="w-7 h-7 text-[#1557B0]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F1B2D]">Mã QR đã tạo hôm nay</p>
                <p className="text-xl font-bold text-[#1557B0]">5,622 <span className="text-xs text-[#7D9E94] font-normal">mã</span></p>
              </div>
            </div>

            {/* Floating verified badge */}
            <div className="absolute top-28 right-4 lg:top-1/4 lg:right-8 z-10 bg-white rounded-2xl shadow-xl border border-[#E5EAF0] px-4 py-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#139F58]" />
              <span className="text-sm font-bold text-[#0F1B2D]">Truy xuất thành công</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <button onClick={scrollPrev} aria-label="Slide trước"
        className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white shadow-md border border-[#E5EAF0] text-[#1557B0] hover:bg-[#EFF5FF] transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={scrollNext} aria-label="Slide tiếp"
        className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white shadow-md border border-[#E5EAF0] text-[#1557B0] hover:bg-[#EFF5FF] transition-all">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${selectedIndex === i ? "bg-[#1557B0] w-8" : "bg-[#DCEEFF] hover:bg-[#1557B0]/40 w-2"}`} />
        ))}
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */

export default function Home() {
  const { openPricingModal, activePlan } = useAuth();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">

      {/* 1. HERO */}
      <HeroSlider />

      {/* 2. WHY CHECKEE — icon strip */}
      <section className="py-16 bg-[#FAFBFC] border-y border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {whyItems.map((item, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A8FE0]/20 to-[#1557B0]/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#1557B0]" />
                </div>
                <div>
                  <p className="font-bold text-[#0F1B2D] text-sm mb-0.5">{item.label}</p>
                  <p className="text-xs text-[#7D9E94] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS — "Giải pháp cho mọi quy mô doanh nghiệp" */}
      <section id="solutions" className="py-24 bg-white scroll-mt-20">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-3">GIẢI PHÁP</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
                Giải pháp cho mọi <span className="text-[#1557B0]">quy mô doanh nghiệp</span>
              </h2>
            </div>
            <Link href="/pricing"
              className="text-[#1557B0] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all shrink-0">
              Xem bảng giá đầy đủ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group rounded-3xl overflow-hidden border border-[#E5EAF0] bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D8A]/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#1557B0] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">
                    {s.tag}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-[#1557B0] text-xl mb-2">{s.title}</h3>
                  <p className="text-[#4A5868] text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-6 pt-5 border-t border-[#E5EAF0] flex flex-col gap-3">
                    <CtaButton href="/demo" className="w-full justify-center">
                      Dùng thử miễn phí
                    </CtaButton>
                    <Link href={s.href}
                      className="text-[#1557B0] font-semibold text-sm hover:text-[#0D3F8A] inline-flex items-center gap-1 justify-center">
                      Chi tiết <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHT BANNER — features + upsell */}
      <section className="py-20 bg-gradient-to-br from-[#0B2D8A] via-[#1557B0] to-[#4A8FE0] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-white/20 blur-2xl" />
        </div>
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
                Tại sao chọn Checkee?
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Nền tảng truy xuất số <br /> được tin dùng nhất Việt Nam
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Từ nông hộ nhỏ đến tập đoàn xuất khẩu — Checkee đồng hành trên mọi hành trình số hoá chuỗi cung ứng.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <TrialButton size="large" className="bg-[#ed8302] hover:bg-[#d47200]" />
                {!activePlan && (
                  <Button variant="outline"
                    onClick={() => openPricingModal()}
                    className="rounded-full border-2 border-white/50 bg-white/10 text-white hover:bg-white hover:text-[#1557B0] px-8 py-4 h-auto font-semibold">
                    Xem gói nâng cấp
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "5,000+", label: "Sản phẩm được định danh" },
                { num: "1,234+", label: "Doanh nghiệp tin dùng" },
                { num: "99.9%", label: "Uptime đảm bảo" },
                { num: "7 ngày", label: "Triển khai nhanh" },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
                  <div className="text-3xl font-bold text-white mb-1">{s.num}</div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWS — "Câu chuyện cùng Checkee" */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-3">TIN TỨC GẦN ĐÂY</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
                Câu chuyện cùng <span className="text-[#1557B0]">Checkee</span>
              </h2>
            </div>
            <Link href="/blog"
              className="text-[#1557B0] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all shrink-0">
              Xem tất cả tin tức <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/industry-agr.png",
                date: { d: "22", m: "Th3" },
                tag: "Bền vững",
                title: "Trà Shan Tuyết Bằng Phúc đạt chứng nhận Làng nghề",
                desc: "Vùng nguyên liệu trọng điểm của Checkee Trace tại Đồng Phúc chính thức được công nhận làng nghề trà cổ thụ.",
              },
              {
                img: "/images/industry-meat.png",
                date: { d: "15", m: "Th3" },
                tag: "Cộng đồng",
                title: "Checkee đồng hành cùng 7 trường học vùng cao Thái Nguyên",
                desc: "Chương trình thiện nguyện trao tặng sữa và trang thiết bị cho học sinh tại Đồng Phúc và Thái Nguyên.",
              },
              {
                img: "/images/industry-seafood.png",
                date: { d: "27", m: "Th3" },
                tag: "Sự kiện",
                title: "Checkee tham dự hội nghị doanh nghiệp đóng góp tăng trưởng hai con số",
                desc: "Sự kiện kết nối Chính phủ và cộng đồng doanh nghiệp về chuyển đổi số chuỗi cung ứng.",
              },
            ].map((n, i) => (
              <motion.article key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-[#E5EAF0] bg-white hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={n.img} alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D8A]/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-white rounded-xl shadow-md text-center px-3 py-2">
                    <div className="text-xl font-bold text-[#1557B0] leading-none">{n.date.d}</div>
                    <div className="text-[10px] uppercase tracking-wide font-semibold text-[#7D9E94] mt-0.5">{n.date.m}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#ed8302] mb-3">
                    <Calendar className="w-3.5 h-3.5" /> {n.tag}
                  </div>
                  <h3 className="font-bold text-[#0F1B2D] text-lg leading-snug mb-3 group-hover:text-[#1557B0] transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-[#4A5868] text-sm leading-relaxed mb-4">{n.desc}</p>
                  <Link href="/blog"
                    className="text-[#1557B0] font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNER MARQUEE */}
      <section id="partners" className="py-20 bg-white border-y border-[#E5EAF0] scroll-mt-24">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center mb-12">
          <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-3">ĐỐI TÁC</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
            Đồng hành cùng các <span className="text-[#1557B0]">đối tác hàng đầu</span>
          </h2>
          <p className="text-[#4A5868] text-base lg:text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            Kết nối cùng những đối tác uy tín hàng đầu, chúng tôi mang đến giải pháp công nghệ toàn diện, hỗ trợ doanh nghiệp bạn phát triển bền vững.
          </p>
        </div>
        <div className="space-y-5 marquee-mask">
          {[
            { logos: partnerRow1, dir: "marquee-left" },
            { logos: partnerRow2, dir: "marquee-right" },
            { logos: partnerRow3, dir: "marquee-left" },
          ].map((row, ri) => (
            <div key={ri} className="overflow-hidden">
              <div className={`marquee-track ${row.dir} gap-5`}>
                {[...row.logos, ...row.logos, ...row.logos, ...row.logos].map((p, i) => (
                  <div key={`${ri}-${i}`}
                    className="flex-shrink-0 bg-white rounded-2xl shadow-[0_4px_18px_rgb(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 w-[180px] h-[88px] flex items-center justify-center px-5">
                    <PartnerLogo domain={p.domain} name={p.name} color={p.color} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-[#EFF5FF]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-3">KHÁCH HÀNG TIN DÙNG</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
              Doanh nghiệp Việt đã chọn <span className="text-[#1557B0]">Checkee</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sau 3 tháng triển khai Checkee, lượng phản ánh hàng giả giảm 78%. Người tiêu dùng chủ động quét QR trước khi mua.",
                name: "Nguyễn Thị Hồng", role: "Giám đốc Marketing, PM Group", init: "NH",
              },
              {
                quote: "Checkee giúp chúng tôi vượt qua kiểm định ESPR khi xuất khẩu sang EU. Quy trình chuẩn quốc tế nhưng giá Việt Nam.",
                name: "Trần Quốc Hưng", role: "CEO, Tâm Trà Thái", init: "TH",
              },
              {
                quote: "Dashboard Checkee cho dữ liệu thật theo từng lô. Chúng tôi tối ưu được kênh phân phối nhờ insights này.",
                name: "Lê Minh Anh", role: "COO, Gas South", init: "LA",
              },
            ].map((t, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm space-y-6 border border-[#DCEEFF]"
              >
                <Quote className="w-8 h-8 text-[#ed8302]" />
                <p className="italic text-[#0F1B2D] text-base leading-relaxed">"{t.quote}"</p>
                <div className="h-[1px] w-full bg-[#E5EAF0]" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A8FE0] to-[#0B2D8A] text-white font-bold flex items-center justify-center text-sm">
                    {t.init}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1557B0]">{t.name}</div>
                    <div className="text-xs text-[#7D9E94]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-3">CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
              Mọi thắc mắc của <span className="text-[#1557B0]">bạn</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "Chi phí triển khai bao nhiêu?",
                  a: "Chi phí triển khai phụ thuộc vào quy mô và nhu cầu thực tế của doanh nghiệp, bắt đầu từ gói Khởi đầu rất dễ tiếp cận. Chúng tôi tính phí minh bạch dựa trên số lượng mã QR và sản phẩm.",
                },
                {
                  q: "Mất bao lâu để triển khai?",
                  a: "Toàn bộ quy trình từ khảo sát, thiết lập hệ thống đến khi in ấn mã QR đầu tiên chỉ mất trung bình 7 ngày làm việc cho doanh nghiệp quy mô vừa.",
                },
                {
                  q: "Checkee tích hợp được với hệ thống ERP/POS hiện tại?",
                  a: "Có. Checkee cung cấp hệ thống API RESTful và Webhook mạnh mẽ, sẵn sàng kết nối liền mạch với các hệ thống ERP, SAP, POS hiện có của doanh nghiệp.",
                },
                {
                  q: "Sản phẩm có đáp ứng Thông tư 02/2024 không?",
                  a: "Checkee Trace được thiết kế với sự tư vấn của các chuyên gia pháp lý, tuân thủ 100% các yêu cầu về trường thông tin định danh và truy xuất theo Thông tư 02/2024/TT-BKHCN.",
                },
                {
                  q: "Checkee có hỗ trợ kỹ thuật không?",
                  a: "Đội ngũ hỗ trợ kỹ thuật của chúng tôi sẵn sàng 24/7 thông qua hotline và email để đảm bảo hệ thống vận hành liên tục và ổn định.",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#E5EAF0]">
                  <AccordionTrigger className="text-lg font-semibold text-[#0F1B2D] hover:text-[#1557B0]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5868] text-base leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="relative py-24 overflow-hidden bg-[#0B2D8A] text-white text-center">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/hero-tech-v2.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B2D8A] via-[#0B2D8A]/70 to-[#0B2D8A]" />
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4A8FE0]/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#4A8FE0]/20 rounded-full blur-2xl translate-y-1/2" />
        <div className="relative z-10 container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
            Sẵn sàng nâng tầm thương hiệu của bạn?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Bắt đầu minh bạch hoá chuỗi cung ứng và gia tăng niềm tin của khách hàng ngay hôm nay.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrialButton size="large">Dùng thử miễn phí</TrialButton>
            <button
              onClick={() => openPricingModal()}
              className="rounded-full border-2 border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#1557B0] px-8 py-4 font-semibold transition-all"
            >
              Xem bảng giá
            </button>
          </div>
          <p className="text-sm text-white/40 mt-2">Không cần thẻ tín dụng · Huỷ bất kỳ lúc nào</p>
        </div>
      </section>

    </div>
  );
}
