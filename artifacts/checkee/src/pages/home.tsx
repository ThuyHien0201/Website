import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, QrCode, Globe, BookOpen, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background to-accent/20" />
        <div className="container relative z-10 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                  Vì người tiêu dùng Việt
                </div>
                <h1 className="text-4xl md:text-6xl tracking-tight text-foreground">
                  QR thông minh cho mọi sản phẩm Việt
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                  Giải pháp số hoá sản phẩm toàn diện đáp ứng quy định pháp lý, nâng tầm thương hiệu và kết nối trực tiếp với người tiêu dùng.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                    Thử miễn phí ngay, không cần đăng ký
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-base">
                    Liên hệ tư vấn
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                <img 
                  src="/images/hero-product.png" 
                  alt="Sản phẩm Việt Nam cao cấp với mã QR" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <span className="font-medium">Chuẩn pháp lý 2024-2026</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y bg-white">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-serif text-primary">2.5M+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Mã QR đã tạo</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-serif text-primary">850+</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Doanh nghiệp</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-serif text-primary">99.9%</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Uptime</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold font-serif text-primary">5</h3>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Giải pháp pháp lý</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif">Giải pháp toàn diện</h2>
            <p className="text-lg text-muted-foreground">Từ truy xuất nguồn gốc đến hộ chiếu số, Checkee cung cấp công cụ đáp ứng mọi nhu cầu quản lý và minh bạch sản phẩm.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Trace",
                desc: "Truy xuất nguồn gốc sản phẩm theo 10 trường thông tin bắt buộc.",
                icon: <Truck className="h-8 w-8 text-[#1D9E75]" />,
                law: "TT 02/2024",
                href: "/trace",
                color: "bg-[#1D9E75]/10",
                textColor: "text-[#1D9E75]"
              },
              {
                title: "E-label",
                desc: "Nhãn điện tử thay nhãn giấy, dễ dàng cập nhật, đa ngôn ngữ.",
                icon: <QrCode className="h-8 w-8 text-[#0C447C]" />,
                law: "NĐ 37/2026",
                href: "/e-label",
                color: "bg-[#0C447C]/10",
                textColor: "text-[#0C447C]"
              },
              {
                title: "DPP",
                desc: "Hộ chiếu số sản phẩm đáp ứng tiêu chuẩn xuất khẩu EU.",
                icon: <Globe className="h-8 w-8 text-[#3C3489]" />,
                law: "ESPR 2024",
                href: "/dpp",
                color: "bg-[#3C3489]/10",
                textColor: "text-[#3C3489]"
              },
              {
                title: "F&B",
                desc: "Quản lý lưu mẫu thức ăn cho bếp ăn công nghiệp và nhà hàng.",
                icon: <BookOpen className="h-8 w-8 text-[#854F0B]" />,
                law: "QĐ 1246",
                href: "/fnb",
                color: "bg-[#854F0B]/10",
                textColor: "text-[#854F0B]"
              },
              {
                title: "Tem phụ",
                desc: "Tem phụ điện tử cho hàng nhập khẩu, giữ bao bì gốc.",
                icon: <CheckCircle2 className="h-8 w-8 text-[#712B13]" />,
                law: "NĐ 37/2026",
                href: "/tem-phu",
                color: "bg-[#712B13]/10",
                textColor: "text-[#712B13]"
              }
            ].map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white rounded-2xl border p-8 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-xl ${product.color}`}>
                    {product.icon}
                  </div>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground bg-muted">
                    {product.law}
                  </span>
                </div>
                <h3 className={`text-2xl font-serif font-bold mb-3 ${product.textColor}`}>
                  Checkee {product.title}
                </h3>
                <p className="text-muted-foreground mb-8 flex-1">
                  {product.desc}
                </p>
                <div className="flex gap-3 mt-auto">
                  <Link href={product.href} className="flex-1">
                    <Button variant="outline" className="w-full justify-between group-hover:border-primary transition-colors">
                      Tìm hiểu thêm
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/demo?product=${product.title.toLowerCase()}`}>
                    <Button variant="secondary" className="px-4">
                      Demo
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Step Process */}
      <section className="py-24 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-serif">Đơn giản, Nhanh chóng</h2>
            <p className="text-lg text-muted-foreground">Triển khai dễ dàng trong 3 bước, không đòi hỏi kiến thức kỹ thuật phức tạp.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-border z-0" />
            
            {[
              { num: "01", title: "Điền thông tin", desc: "Khai báo dữ liệu sản phẩm theo mẫu biểu chuẩn hoá pháp lý." },
              { num: "02", title: "Tạo QR tự động", desc: "Hệ thống tự động thiết kế landing page và sinh mã QR." },
              { num: "03", title: "Dán lên sản phẩm", desc: "In và dán mã QR lên bao bì, sẵn sàng cho người tiêu dùng quét." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4 bg-white p-6">
                <div className="w-24 h-24 rounded-full bg-accent text-primary flex items-center justify-center text-3xl font-serif font-bold shadow-sm border-4 border-white">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/demo">
              <Button size="lg" className="h-14 px-8 text-base">Trải nghiệm quá trình này ngay</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-accent/30 border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-16">Khách hàng nói gì về Checkee</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Nhờ Checkee Trace, chúng tôi dễ dàng đáp ứng Thông tư 02 mà không cần thay đổi quá nhiều quy trình nội bộ. Giao diện rất trực quan.",
                author: "Nguyễn Văn A",
                title: "Giám đốc Vận hành, Vinamilk Organic Farm"
              },
              {
                quote: "Hệ thống lưu mẫu thức ăn F&B giúp trường học chúng tôi minh bạch hoàn toàn với phụ huynh. Không còn giấy tờ thủ công.",
                author: "Trần Thị B",
                title: "Trưởng ban Bán trú, Bếp ăn Trường Quốc tế Việt Úc"
              },
              {
                quote: "Tem phụ điện tử của Checkee giúp giữ nguyên vẻ đẹp bao bì của mỹ phẩm nhập khẩu, khách hàng quét QR là thấy đầy đủ thông tin.",
                author: "Lê Văn C",
                title: "CEO, Nhập khẩu mỹ phẩm Hàn Quốc HanLux"
              }
            ].map((test, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border space-y-6 flex flex-col">
                <div className="text-primary text-4xl font-serif">"</div>
                <p className="text-foreground/80 italic flex-1">{test.quote}</p>
                <div>
                  <div className="font-bold">{test.author}</div>
                  <div className="text-sm text-muted-foreground">{test.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Summary */}
      <section className="py-24 bg-white border-t">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif">Bảng giá minh bạch</h2>
            <p className="text-lg text-muted-foreground">Chi phí hợp lý, phù hợp từ doanh nghiệp nhỏ đến tập đoàn lớn. Chỉ trả tiền cho những gì bạn cần.</p>
          </div>
          
          <div className="bg-accent/30 rounded-3xl p-8 md:p-12 border max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left space-y-2">
              <h3 className="text-2xl font-bold">Bắt đầu chỉ từ 900.000đ/năm</h3>
              <p className="text-muted-foreground">Đầy đủ tính năng đáp ứng tiêu chuẩn pháp lý mới nhất.</p>
            </div>
            <Link href="/pricing">
              <Button size="lg" className="h-14 px-8 text-base">Xem chi tiết 5 gói sản phẩm</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
