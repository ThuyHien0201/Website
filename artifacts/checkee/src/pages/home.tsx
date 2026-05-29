import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { TrialButton } from "@/components/ui/trial-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Globe,
  Quote,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const heroSlides = [
  "/images/hero-vietnam-trace.png",
  "/images/hero-bright-1.png",
  "/images/hero-bright-2.png",
  "/images/hero-bright-3.png",
];

type PartnerItem = { name: string; src: string; w: string; h: string };

const partnerLogos: PartnerItem[] = [
  { name: "DCRD", src: "https://sorimachi.vn/wp-content/uploads/2025/02/logo-dcrd.png", w: "3.4rem", h: "3.4rem" },
  { name: "VCA", src: "https://sorimachi.vn/wp-content/uploads/2025/02/logo-vca.png", w: "3.4rem", h: "3.4rem" },
  { name: "Khuyến nông VN", src: "https://sorimachi.vn/wp-content/uploads/2025/02/logo-khuyennong.png", w: "7.5rem", h: "3.4rem" },
  { name: "SAGRI", src: "https://sorimachi.vn/wp-content/uploads/2025/01/logo-sagri.png", w: "7.8rem", h: "2.5rem" },
  { name: "Hitachi", src: "https://sorimachi.vn/wp-content/uploads/2025/01/logo-hitachi.png", w: "7.5rem", h: "2.3rem" },
  { name: "Techcoop", src: "https://sorimachi.vn/wp-content/uploads/2025/01/logo-techcoop-1024x470.png", w: "7.4rem", h: "2.3rem" },
  { name: "Foodmap", src: "https://sorimachi.vn/wp-content/uploads/2025/01/Frame-144-1.jpg", w: "7.5rem", h: "2.3rem" },
  { name: "VJU", src: "https://sorimachi.vn/wp-content/uploads/2025/05/Logo_vju.svg-1024x1024.png", w: "3.4rem", h: "3.4rem" },
  { name: "VNUA", src: "https://sorimachi.vn/wp-content/uploads/2025/06/98377128-ee86-4d05-a0f6-ac124505b2c3.jpg", w: "3.4rem", h: "3.4rem" },
  { name: "TUAF", src: "https://sorimachi.vn/wp-content/uploads/2025/05/Truong_Dai_hoc_Nong_lam_Dai_hoc_Thai_Nguyen.svg.png", w: "3.4rem", h: "3.4rem" },
  { name: "Nagaoka", src: "https://sorimachi.vn/wp-content/uploads/2025/06/nagaoka_logo.jpg", w: "3.4rem", h: "3.4rem" },
  { name: "HCMUT", src: "https://sorimachi.vn/wp-content/uploads/2025/06/HCMUT_official_logo-1014x1024.png", w: "3.4rem", h: "3.4rem" },
  { name: "IUH", src: "https://sorimachi.vn/wp-content/uploads/2025/06/logo-iuh-inkythuatso-01-08-11-08-01.jpg", w: "7.5rem", h: "3.4rem" },
];

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

const stats = [
  { value: "5.000", symbol: "+", label: "Sản phẩm định danh" },
  { value: "1.234", symbol: "+", label: "Doanh nghiệp tin dùng" },
  { value: "13", symbol: "", label: "Đối tác chiến lược" },
  { value: "99", symbol: "%", label: "Tỷ lệ hài lòng" },
];

function PartnerMarquee() {
  return (
    <div className="bg-white border-y border-[#E5EAF0] shadow-[0_0_24px_rgba(217,217,217,0.6)] overflow-hidden py-[1.35rem]">
      <div className="marquee-track marquee-left gap-[3.8rem]">
        {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((p, i) => (
          <figure key={i} className="flex-shrink-0 flex items-center">
            <img
              src={p.src}
              alt={p.name}
              style={{ width: p.w, height: p.h }}
              className="object-contain"
            />
          </figure>
        ))}
      </div>
    </div>
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
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0a1a3e]">
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
              {/* Neutral dark overlay — left strong, right fades */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#060d2b]/88 via-[#060d2b]/55 to-[#060d2b]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d2b]/50 via-transparent to-transparent" />
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
         

          <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-bold text-white leading-[1.08] tracking-tight drop-shadow-lg">
            Minh bạch chuỗi cung ứng <br />
            <span className="text-[#fdba74]">nâng tầm thương hiệu Việt.</span>
          </h1>

          <p className="text-white/85 text-lg lg:text-xl max-w-2xl leading-relaxed drop-shadow">
            Checkee phát triển nền tảng số phục vụ quản lý, định danh và truy xuất nguồn gốc sản phẩm hàng hoá — kết nối Cổng TXNG Quốc gia, chống hàng giả và thúc đẩy chuyển đổi số doanh nghiệp Việt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <TrialButton size="large" />
            <a href="#solutions">
              <Button
                variant="outline"
                className="rounded-full border-2 border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#13399E] px-8 py-4 h-auto font-semibold backdrop-blur-sm"
              >Đăng ký sử dụng
</Button>
            </a>
          </div>
        </motion.div>
      </div>
      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Slide trước"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/25 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Slide tiếp"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md border border-white/25 transition-all"
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
              selectedIndex === i ? "bg-[#fdba74] w-10" : "bg-white/40 hover:bg-white/70 w-5"
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

      {/* 1. HERO */}
      <HeroSlider />

      {/* 2. PARTNER MARQUEE — single sticky-style row with shadow */}
      <PartnerMarquee />

      {/* 3. SOLUTIONS */}
      <section id="solutions" className="py-24 bg-[#FAFBFC] scroll-mt-20">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[#F58023] uppercase tracking-widest text-xs font-semibold block mb-3">GIẢI PHÁP</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#0E3DA5] leading-tight">
                Giải pháp cho mọi quy mô doanh nghiệp
              </h2>
            </div>
            <Link
              href="/pricing"
              className="text-[#0E3DA5] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
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
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#0E3DA5] text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full">
                    {s.tag}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-[#0E3DA5] text-xl mb-2">{s.title}</h3>
                  <p className="text-[#4A5868] text-sm leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-6 pt-5 border-t border-[#E5EAF0] flex flex-col gap-3">
                    <CtaButton href={`/demo?solution=${encodeURIComponent(s.title)}`} className="w-full justify-center">
                      Dùng thử miễn phí
                    </CtaButton>
                    <Link
                      href={s.href}
                      className="text-[#0E3DA5] font-semibold text-sm hover:text-[#13399E] inline-flex items-center gap-1 justify-center"
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

      {/* 4. STATS — "Những con số nổi bật" */}
      <section className="py-20 bg-white border-y border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-dashed border-[#F58023] rounded-full px-5 py-2 text-sm text-[#F58023] font-semibold">
                Những con số nổi bật
              </span>
              <h2
                className="text-3xl lg:text-4xl font-semibold text-[#161A47] uppercase tracking-wide relative"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Kết quả thực tế từ Checkee
                <span className="absolute -bottom-2 left-6 right-6 h-[1px] bg-[#F58024]" />
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-end gap-1 leading-none mb-3">
                  <span
                    className="font-extrabold text-[3.5rem] lg:text-[4rem] text-[#161A47] tracking-tight leading-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {s.value}
                  </span>
                  {s.symbol && (
                    <span className="font-extrabold text-[3rem] text-[#161A47] leading-none pb-1">
                      {s.symbol}
                    </span>
                  )}
                </div>
                <div className="w-8 h-[2px] bg-[#F58024] rounded-full mb-3" />
                <p className="text-[#4A5868] text-sm font-semibold uppercase tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEWS */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-[#F58023] uppercase tracking-widest text-xs font-semibold block mb-3">
                TIN TỨC GẦN ĐÂY
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#0E3DA5] leading-tight">
                Câu chuyện cùng Checkee
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[#0E3DA5] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
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
                  <div className="absolute top-4 left-4 bg-white text-[#0E3DA5] text-center px-3 py-2 rounded-xl shadow-lg">
                    <div className="text-xl font-bold leading-none">{n.date.d}</div>
                    <div className="text-[10px] uppercase tracking-wide font-semibold mt-0.5">{n.date.m}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#F58023] mb-3">
                    <Calendar className="w-3.5 h-3.5" /> {n.tag}
                  </div>
                  <h3 className="font-bold text-[#0E3DA5] text-lg leading-snug mb-3">
                    {n.title}
                  </h3>
                  <p className="text-[#4A5868] text-sm leading-relaxed mb-4">{n.desc}</p>
                  <Link
                    href="/blog"
                    className="text-[#0E3DA5] font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PARTNER SECTION — full grid */}
      <section id="partners" className="py-20 bg-white border-y border-[#E5EAF0] scroll-mt-24">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center mb-12">
          <span className="text-[#F58023] uppercase tracking-widest text-xs font-semibold block mb-3">ĐỐI TÁC</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#0F1B2D] leading-tight">
            Đồng hành cùng các <span className="text-[#F58023]">đối tác hàng đầu</span>
          </h2>
          <p className="text-[#4A5868] text-base lg:text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            Kết nối cùng những đối tác uy tín hàng đầu, chúng tôi mang đến giải pháp công nghệ toàn diện, hỗ trợ doanh nghiệp bạn phát triển bền vững.
          </p>
        </div>

        <div className="space-y-4 marquee-mask">
          {[
            { logos: partnerLogos.slice(0, 7), dir: "marquee-left" },
            { logos: partnerLogos.slice(6, 13), dir: "marquee-right" },
          ].map((row, ri) => (
            <div key={ri} className="overflow-hidden">
              <div className={`marquee-track ${row.dir} gap-5`}>
                {[...row.logos, ...row.logos, ...row.logos, ...row.logos].map((p, i) => (
                  <div
                    key={`${ri}-${i}`}
                    className="flex-shrink-0 bg-white rounded-2xl shadow-[0_4px_18px_rgb(0,0,0,0.06)] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 w-[180px] h-[88px] flex items-center justify-center px-5"
                  >
                    <img src={p.src} alt={p.name} style={{ width: p.w, height: p.h }} className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-[#F4F6F8]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F58023] uppercase tracking-widest text-xs font-semibold block mb-4">
              KHÁCH HÀNG TIN DÙNG
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0E3DA5] leading-tight">
              Doanh nghiệp Việt đã chọn Checkee
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Sau 3 tháng triển khai Checkee, lượng phản ánh hàng giả giảm 78%. Người tiêu dùng chủ động quét QR trước khi mua.",
                name: "Nguyễn Thị Hồng",
                role: "Giám đốc Marketing, PM Group",
                init: "NH",
              },
              {
                quote: "Checkee giúp chúng tôi vượt qua kiểm định ESPR khi xuất khẩu sang EU. Quy trình chuẩn quốc tế nhưng giá Việt Nam.",
                name: "Trần Quốc Hưng",
                role: "CEO, Tâm Trà Thái",
                init: "TH",
              },
              {
                quote: "Dashboard Checkee cho dữ liệu thật theo từng lô. Chúng tôi tối ưu được kênh phân phối nhờ insights này.",
                name: "Lê Minh Anh",
                role: "COO, Gas South",
                init: "LA",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5EAF0] space-y-6">
                <Quote className="w-8 h-8 text-[#F58023]" />
                <p className="italic text-[#0F1B2D] text-base leading-relaxed">"{t.quote}"</p>
                <div className="h-[1px] w-full bg-[#E5EAF0]" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#DCEEFF] text-[#0E3DA5] font-bold flex items-center justify-center">
                    {t.init}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0E3DA5]">{t.name}</div>
                    <div className="text-xs text-[#7D9E94]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F58023] uppercase tracking-widest text-xs font-semibold block mb-4">
              CÂU HỎI THƯỜNG GẶP
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0E3DA5] leading-tight">Mọi thắc mắc của bạn</h2>
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
                  <AccordionTrigger className="text-lg font-semibold text-[#0E3DA5]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5868] text-base leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA — blue gradient banner (sorimachi style) */}
      <section className="py-20 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div
            className="relative rounded-[10px] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 px-12 py-16"
            style={{ background: "linear-gradient(94.4deg, #13399E 20.87%, #234FCA 86.36%)" }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white blur-[120px] -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="relative z-10 text-center lg:text-left">
              <p
                className="text-white font-light leading-none mb-4"
                style={{ fontSize: "5.5rem", fontFamily: "Roboto, sans-serif", lineHeight: 1.05 }}
              >
                LIÊN HỆ
              </p>
              <p className="text-white/70 text-lg max-w-xl">
                Sẵn sàng nâng tầm thương hiệu của bạn? Bắt đầu minh bạch hoá chuỗi cung ứng ngay hôm nay.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center lg:items-end gap-4">
              <TrialButton size="large">Dùng thử miễn phí</TrialButton>
              <Link
                href="/contact"
                className="flex items-center gap-3 text-white font-semibold hover:gap-4 transition-all"
              >
                Liên hệ tư vấn
                <span className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
