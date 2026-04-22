import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const [, setLocation] = useLocation();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/demo");
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[100vh] min-h-[700px] w-full overflow-hidden bg-[#060B25]">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="/images/hero-coffee.png" 
            alt="Vietnamese coffee plantation at dawn" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060B25]/30 via-[#060B25]/50 to-[#060B25]/90 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-6">
              Niềm tin minh bạch cho mọi <br className="hidden md:block" /> sản phẩm <span className="italic font-light">Việt</span>
            </h1>
            <p className="text-[13px] md:text-[14px] text-[#F5F5F0]/80 max-w-2xl mx-auto leading-relaxed">
              Giải pháp số hoá sản phẩm toàn diện. Vượt qua mọi rào cản pháp lý khắt khe nhất, từ Thông tư 02 đến ESPR Châu Âu, bằng một trải nghiệm thương hiệu hoàn mỹ.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="w-[1px] h-12 bg-white/20" />
            </div>
          </motion.div>
        </div>

        {/* Search Bar matching Blue More pattern */}
        <div className="absolute bottom-12 left-0 w-full px-6 flex justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl"
          >
            <div className="text-center text-[11px] text-white/70 uppercase tracking-[0.15em] mb-4">
              Tìm gói phù hợp · Mất 30 giây
            </div>
            
            <form onSubmit={handleSearchSubmit} className="bg-white rounded-full flex flex-col md:flex-row items-center p-2 shadow-2xl w-full">
              
              <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 border-b md:border-b-0 md:border-r border-black/10">
                <label className="block text-[10px] uppercase tracking-[0.1em] text-black/50 font-semibold mb-1">Sản phẩm</label>
                <select className="w-full bg-transparent text-[13px] text-black font-medium outline-none cursor-pointer appearance-none">
                  <option>Trace (Nguồn gốc)</option>
                  <option>E-label (Nhãn số)</option>
                  <option>DPP (Xuất khẩu)</option>
                  <option>F&B (Lưu mẫu)</option>
                  <option>Tem phụ nhập khẩu</option>
                </select>
              </div>

              <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 border-b md:border-b-0 md:border-r border-black/10">
                <label className="block text-[10px] uppercase tracking-[0.1em] text-black/50 font-semibold mb-1">Quy mô</label>
                <select className="w-full bg-transparent text-[13px] text-black font-medium outline-none cursor-pointer appearance-none">
                  <option>Nhỏ (&lt; 5 SP)</option>
                  <option>Vừa (5 - 50 SP)</option>
                  <option>Lớn (&gt; 50 SP)</option>
                </select>
              </div>

              <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2 border-b md:border-b-0 md:border-r border-black/10">
                <label className="block text-[10px] uppercase tracking-[0.1em] text-black/50 font-semibold mb-1">Ngành hàng</label>
                <select className="w-full bg-transparent text-[13px] text-black font-medium outline-none cursor-pointer appearance-none">
                  <option>Thực phẩm & Đồ uống</option>
                  <option>Dệt may & Thời trang</option>
                  <option>Mỹ phẩm & Dược phẩm</option>
                  <option>Khác</option>
                </select>
              </div>

              <div className="flex-1 w-full md:w-auto px-6 py-3 md:py-2">
                <label className="block text-[10px] uppercase tracking-[0.1em] text-black/50 font-semibold mb-1">Mục đích</label>
                <select className="w-full bg-transparent text-[13px] text-black font-medium outline-none cursor-pointer appearance-none">
                  <option>Thị trường Trong nước</option>
                  <option>Xuất khẩu Châu Âu (EU)</option>
                  <option>Cả hai</option>
                </select>
              </div>

              <button type="submit" className="w-full md:w-auto md:ml-2 mt-4 md:mt-0 bg-[#83776D] hover:bg-[#83776D]/90 text-white rounded-full p-4 md:p-5 flex items-center justify-center transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS SECTION matching Yacht for Charter */}
      <section className="py-32 bg-[#060B25] text-white">
        <div className="container px-6 md:px-12 max-w-[1400px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-4">05 Sản phẩm</div>
              <h2 className="text-3xl md:text-4xl font-normal leading-tight">
                Sản phẩm cho mọi <span className="italic font-light text-[#B8B5AE]">quy mô</span>
              </h2>
            </div>
            <Link href="/pricing" className="text-[13px] text-[#B8B5AE] hover:text-white link-hover uppercase tracking-wide">
              Xem bảng giá &rarr;
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "trace",
                label: "TT 02/2024",
                title: "Checkee Trace",
                desc: "Truy xuất nguồn gốc minh bạch",
                image: "/images/hero-tea.png",
                href: "/trace"
              },
              {
                id: "elabel",
                label: "NĐ 37/2026",
                title: "Checkee E-label",
                desc: "Nhãn điện tử đa ngôn ngữ",
                image: "/images/hero-factory.png",
                href: "/e-label"
              },
              {
                id: "dpp",
                label: "EU ESPR",
                title: "Checkee DPP",
                desc: "Hộ chiếu số xuất khẩu",
                image: "/images/hero-lacquer.png",
                href: "/dpp"
              },
              {
                id: "fnb",
                label: "QĐ 1246/BYT",
                title: "Checkee F&B",
                desc: "Lưu mẫu thức ăn nhà hàng",
                image: "/images/hero-rice.png",
                href: "/fnb"
              },
              {
                id: "temphu",
                label: "Nhập khẩu",
                title: "Checkee Tem Phụ",
                desc: "Nhãn phụ số hoá thanh lịch",
                image: "/images/hero-silk.png",
                href: "/tem-phu"
              }
            ].map((prod) => (
              <Link key={prod.id} href={prod.href} className="group block bg-[#0A1130] rounded-md overflow-hidden hairline-t hairline-b border-x border-white/5 transition-all duration-500 hover:bg-[#0E1538]">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#060B25]/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img src={prod.image} alt={prod.title} className="w-full h-full object-cover image-hover" />
                </div>
                <div className="p-8">
                  <div className="text-[10px] text-[#83776D] uppercase tracking-[0.15em] mb-3">{prod.label}</div>
                  <h3 className="text-xl font-normal text-white mb-2">{prod.title}</h3>
                  <p className="text-[13px] text-[#B8B5AE]">{prod.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-[#040613] text-white">
        <div className="container px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-16"
            >
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-4">Tinh giản quy trình</div>
                <h2 className="text-3xl md:text-4xl font-normal leading-tight">
                  Tạo dấu ấn <span className="italic font-light text-[#B8B5AE]">điện tử</span>
                </h2>
              </div>
              
              <div className="space-y-10">
                {[
                  { num: "01.", title: "Thiết lập định danh", desc: "Khai báo thông tin sản phẩm theo các tiêu chuẩn pháp lý khắt khe nhất. Nhanh chóng và chuẩn xác." },
                  { num: "02.", title: "Sinh mã thông minh", desc: "Hệ thống tự động biên dịch dữ liệu thành giao diện hiển thị sang trọng, tương thích đa nền tảng." },
                  { num: "03.", title: "Khẳng định thương hiệu", desc: "Tem QR được đính kết lên bao bì, mở ra không gian tương tác vô tận với khách hàng cao cấp." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-[13px] font-normal text-[#83776D] pt-1">{step.num}</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-normal text-white">{step.title}</h3>
                      <p className="text-[#B8B5AE] text-[13px] leading-relaxed max-w-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-8">
                <Link href="/demo" className="inline-flex items-center text-[13px] text-white uppercase tracking-wide link-hover group pb-1">
                  Khởi tạo trải nghiệm <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[4/5] overflow-hidden rounded-md bg-[#0A1130]"
            >
              <img 
                src="/images/hero-saigon.png" 
                alt="Modern packaging" 
                className="w-full h-full object-cover image-hover opacity-80"
              />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#060B25] text-center border-t border-white/5">
        <div className="container px-6 max-w-3xl mx-auto">
          <div className="text-[11px] uppercase tracking-[0.15em] text-[#83776D] mb-6">Tham gia cùng chúng tôi</div>
          <h2 className="text-4xl md:text-5xl font-normal leading-tight text-white mb-10">
            Sẵn sàng nâng tầm <br/><span className="italic font-light text-[#B8B5AE]">thương hiệu?</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button className="w-full sm:w-auto rounded-md bg-[#83776D] hover:bg-[#83776D]/90 text-white uppercase text-[11px] tracking-[0.15em] px-8 py-6 h-auto">
                Liên hệ đối tác
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" className="w-full sm:w-auto rounded-md bg-transparent border-white/20 text-white hover:bg-white hover:text-[#060B25] uppercase text-[11px] tracking-[0.15em] px-8 py-6 h-auto transition-all duration-300">
                Trải nghiệm mẫu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}