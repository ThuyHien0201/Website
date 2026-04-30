import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ShieldCheck,
  Globe,
  Quote,
  ArrowRight,
  Calendar,
  Headphones,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const heroSlides = [
  "/images/hero-bright-1.png",
  "/images/hero-bright-2.png",
  "/images/hero-bright-3.png",
];

const partnerLogos = [
  { name: "Vinamilk", domain: "vinamilk.com.vn", color: "#0B4F6C" },
  { name: "Vinasoy", domain: "vinasoy.com", color: "#1A6B52" },
  { name: "Mobifone", domain: "mobifone.vn", color: "#1B4FA0" },
  { name: "Viettel", domain: "viettel.vn", color: "#E8472C" },
  { name: "TH True Milk", domain: "thmilk.vn", color: "#0E4A8A" },
  { name: "Highlands Coffee", domain: "highlandscoffee.com.vn", color: "#7A2E0E" },
  { name: "Phúc Long", domain: "phuclong.com.vn", color: "#1A6B52" },
  { name: "Trung Nguyên", domain: "trungnguyenlegend.com", color: "#7A2E0E" },
  { name: "Sabeco", domain: "sabeco.com.vn", color: "#E8472C" },
  { name: "Habeco", domain: "habeco.com.vn", color: "#C45B17" },
  { name: "Bibica", domain: "bibica.com.vn", color: "#1A7EA4" },
  { name: "Acecook", domain: "acecookvietnam.com.vn", color: "#E8472C" },
  { name: "Masan", domain: "masangroup.com", color: "#0B4F6C" },
  { name: "PNJ", domain: "pnj.com.vn", color: "#C8A24A" },
  { name: "Vietjet Air", domain: "vietjetair.com", color: "#E8472C" },
  { name: "Vingroup", domain: "vingroup.net", color: "#0B4F6C" },
  { name: "Hoa Sen", domain: "hoasengroup.vn", color: "#F2A65A" },
  { name: "Coca-Cola", domain: "cocacolavietnam.com", color: "#E8472C" },
  { name: "Nestlé", domain: "nestle.com.vn", color: "#0E4A8A" },
  { name: "Unilever", domain: "unilever.com.vn", color: "#1B4FA0" },
  { name: "PepsiCo", domain: "pepsico.com.vn", color: "#1B4FA0" },
];

const partnerRow1 = partnerLogos.slice(0, 7);
const partnerRow2 = partnerLogos.slice(7, 14);
const partnerRow3 = partnerLogos.slice(14, 21);

function PartnerLogo({ domain, name, color }: { domain: string; name: string; color: string }) {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  if (step === 2) {
    return (
      <span
        className="font-extrabold text-base tracking-tight text-center leading-tight"
        style={{ color }}
      >
        {name}
      </span>
    );
  }
  const src =
    step === 0
      ? `https://unavatar.io/${domain}?fallback=false`
      : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  return (
    <img
      src={src}
      alt={name}
      onError={() => setStep((s) => (s === 0 ? 1 : 2))}
      className="max-h-14 max-w-[150px] object-contain"
      loading="lazy"
    />
  );
}

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
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#FFF7EC]">
      {/* Slider track */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <img
                src={src}
                alt={`Checkee hero ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Soft gradient — keep right side bright, dim left for headline readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E2A]/85 via-[#0B1E2A]/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E2A]/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container max-w-[1280px] mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-7"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight drop-shadow-lg">
            Minh bạch chuỗi cung ứng,<br />
            <span className="text-[#F2A65A]">nâng tầm thương hiệu Việt.</span>
          </h1>

          <p className="text-white/90 text-lg lg:text-xl max-w-2xl leading-relaxed drop-shadow">
            Checkee phát triển nền tảng số phục vụ quản lý, định danh và truy xuất nguồn gốc sản phẩm hàng hoá — kết nối Cổng TXNG Quốc gia, chống hàng giả và thúc đẩy chuyển đổi số doanh nghiệp Việt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <CtaButton href="/demo" size="large">Dùng thử miễn phí</CtaButton>
            <a href="#solutions">
              <Button
                variant="outline"
                className="rounded-full border-2 border-white/50 bg-white/10 text-white hover:bg-white hover:text-[#0B4F6C] px-8 py-4 h-auto font-semibold backdrop-blur-sm"
              >
                Khám phá giải pháp
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-10 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-white">5,000<span className="text-[#F2A65A]">+</span></div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">Sản phẩm đã định danh</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">1,234<span className="text-[#F2A65A]">+</span></div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">Doanh nghiệp tin dùng</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">10/10</div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-1">Tuân thủ TT 02/2024</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Slide trước"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Slide tiếp"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/30 transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              selectedIndex === i ? "bg-[#F2A65A] w-10" : "bg-white/50 hover:bg-white/80 w-5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    };
    const t = setTimeout(tryScroll, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO — bright slider with 3 backgrounds */}
      <HeroSlider />

      {/* 2. FOUNDER + GLOBE — matbao-inspired */}
      <section id="founder" className="relative bg-[#FFF7EC] overflow-hidden scroll-mt-24">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
            {/* Globe (background on mobile, right column on desktop) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[120%] opacity-20 lg:opacity-100 lg:relative lg:right-auto lg:top-auto lg:translate-y-0 lg:w-auto lg:order-2 pointer-events-none">
              <img
                src="/images/halftone-globe.png"
                alt=""
                className="w-full h-auto max-w-[640px] mx-auto spin-slow"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10 lg:order-1 space-y-6"
            >
              <p className="text-[#4A5868] text-lg lg:text-2xl max-w-xl leading-relaxed">
                Với sứ mệnh đồng hành cùng doanh nghiệp Việt minh bạch chuỗi cung ứng và bảo vệ giá trị thương hiệu trên nền tảng số.
              </p>
              <p className="text-[#0F1B2D] text-base">
                <span className="font-bold italic">Nguyễn Minh Đức</span>
                <span className="text-[#7D9E94]"> · Nhà sáng lập & CEO Checkee</span>
              </p>
              <div className="pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 bg-[#C45B17] hover:bg-[#A04612] text-white font-semibold px-7 py-4 rounded-full transition-colors shadow-lg shadow-[#C45B17]/20"
                >
                  Khách hàng nói gì về Checkee
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* 3 feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 lg:mt-20 relative z-10">
            {[
              {
                icon: ShieldCheck,
                title: "An toàn & tin cậy",
                desc: "Dữ liệu mã hoá chuẩn ISO 27001, lưu trên Blockchain bất biến — minh bạch, không thể chỉnh sửa.",
                tags: ["Blockchain", "ISO 27001", "GS1"],
              },
              {
                icon: Headphones,
                title: "Đội ngũ hỗ trợ 24/7",
                desc: "Cam kết phản hồi trong vòng 15 phút, kỹ thuật viên Checkee đồng hành cùng bạn từ ngày đầu triển khai.",
                tags: ["Hotline 24/7", "Email", "Zalo OA"],
              },
              {
                icon: TrendingUp,
                title: "Đồng hành & phát triển cùng SME",
                desc: "Checkee hiểu rõ doanh nghiệp Việt cần gì để vận hành và tăng trưởng trong thời đại số.",
                tags: ["Tư vấn 1-1", "Onboarding", "Insights"],
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#C45B17] text-white mb-5">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0F1B2D] text-lg mb-3">{f.title}</h3>
                <p className="text-[#4A5868] text-sm leading-relaxed mb-5">{f.desc}</p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#F1F5F8]">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] uppercase tracking-wide font-semibold text-[#7D9E94]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. PARTNER MARQUEE — matbao-style scrolling logos */}
      <section id="partners" className="py-20 bg-white border-y border-[#E5EAF0] scroll-mt-24">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
            Đồng hành cùng các <span className="text-[#C45B17]">đối tác hàng đầu</span>
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
                  <div
                    key={`${ri}-${i}`}
                    className="flex-shrink-0 bg-white rounded-2xl shadow-[0_4px_18px_rgb(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 w-[180px] h-[88px] flex items-center justify-center px-5"
                  >
                    <PartnerLogo domain={p.domain} name={p.name} color={p.color} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOLUTION BLOCKS — replaces "Featured Products" with free trial CTAs */}
      <section id="solutions" className="py-24 bg-[#FAFBFC] scroll-mt-20">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">
                BỘ GIẢI PHÁP CHECKEE
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">
                Giải pháp cho mọi quy mô doanh nghiệp
              </h2>
              <p className="text-[#4A5868] text-base lg:text-lg mt-4 leading-relaxed">
                Năm giải pháp chuyên biệt — chọn ngay gói phù hợp với ngành hàng và quy mô của bạn.
              </p>
            </div>
            <Link
              href="/pricing"
              className="text-[#0B4F6C] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              Xem bảng giá đầy đủ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-[#E5EAF0] bg-white hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0B4F6C] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">
                    {s.tag}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-[#0B4F6C] text-xl mb-2">{s.title}</h3>
                  <p className="text-[#4A5868] text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-6 pt-5 border-t border-[#E5EAF0] flex flex-col gap-3">
                    <CtaButton href={`/demo?solution=${encodeURIComponent(s.title)}`} className="w-full justify-center">
                      Dùng thử miễn phí
                    </CtaButton>
                    <Link
                      href={s.href}
                      className="text-[#1A7EA4] font-semibold text-sm hover:text-[#0B4F6C] inline-flex items-center gap-1 justify-center"
                    >
                      Chi tiết <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWS */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">
                TIN TỨC GẦN ĐÂY
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">
                Câu chuyện cùng Checkee
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[#0B4F6C] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
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
              <motion.article
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-[#E5EAF0] bg-white hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={n.img}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white text-[#0B4F6C] text-center px-3 py-2 rounded-xl shadow-lg">
                    <div className="text-xl font-bold leading-none">{n.date.d}</div>
                    <div className="text-[10px] uppercase tracking-wide font-semibold mt-0.5">{n.date.m}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#C45B17] mb-3">
                    <Calendar className="w-3.5 h-3.5" /> {n.tag}
                  </div>
                  <h3 className="font-bold text-[#0B4F6C] text-lg leading-snug mb-3 group-hover:text-[#1A7EA4] transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-[#4A5868] text-sm leading-relaxed mb-4">{n.desc}</p>
                  <Link
                    href="/blog"
                    className="text-[#1A7EA4] font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-[#F5E8DC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">
              KHÁCH HÀNG TIN DÙNG
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">
              Doanh nghiệp Việt đã chọn Checkee
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Sau 3 tháng triển khai Checkee, lượng phản ánh hàng giả giảm 78%. Người tiêu dùng chủ động quét QR trước khi mua.",
                name: "Nguyễn Thị Hồng",
                role: "Giám đốc Marketing, PM Group",
                init: "NH",
              },
              {
                quote:
                  "Checkee giúp chúng tôi vượt qua kiểm định ESPR khi xuất khẩu sang EU. Quy trình chuẩn quốc tế nhưng giá Việt Nam.",
                name: "Trần Quốc Hưng",
                role: "CEO, Tâm Trà Thái",
                init: "TH",
              },
              {
                quote:
                  "Dashboard Checkee cho dữ liệu thật theo từng lô. Chúng tôi tối ưu được kênh phân phối nhờ insights này.",
                name: "Lê Minh Anh",
                role: "COO, Gas South",
                init: "LA",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                <Quote className="w-8 h-8 text-[#C45B17]" />
                <p className="italic text-[#0F1B2D] text-base leading-relaxed">"{t.quote}"</p>
                <div className="h-[1px] w-full bg-[#E5EAF0]"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D9EEF5] text-[#0B4F6C] font-bold flex items-center justify-center">
                    {t.init}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B4F6C]">{t.name}</div>
                    <div className="text-xs text-[#7D9E94]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Mọi thắc mắc của bạn</h2>
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
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-lg font-semibold text-[#0B4F6C]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5868] text-base leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA — dark with tech bg overlay */}
      <section className="relative py-24 bg-[#061826] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img src="/images/hero-tech-v2.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061826] via-[#061826]/70 to-[#061826]" />
        </div>
        <div className="relative z-10 container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">
            Sẵn sàng nâng tầm thương hiệu của bạn?
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Bắt đầu minh bạch hoá chuỗi cung ứng và gia tăng niềm tin của khách hàng ngay hôm nay.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <CtaButton href="/demo" size="large">Dùng thử miễn phí 14 ngày</CtaButton>
            <p className="text-sm text-white/50 mt-2">Không cần thẻ tín dụng · Huỷ bất kỳ lúc nào</p>
          </div>
        </div>
      </section>
    </div>
  );
}
