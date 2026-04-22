import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-32 md:pt-48 md:pb-40 overflow-hidden bg-background">
        <div className="container relative z-10 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col space-y-12 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Thư ngỏ từ Checkee · Tháng 4 2026
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-primary">
                Sự minh bạch đích thực <br className="hidden md:block"/> là sự sang trọng cao nhất.
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12"
            >
              <p className="text-lg md:text-xl text-muted-foreground max-w-md font-light leading-relaxed">
                Giải pháp số hoá sản phẩm toàn diện. Vượt qua mọi rào cản pháp lý khắt khe nhất, từ Thông tư 02 đến ESPR Châu Âu, bằng một trải nghiệm thương hiệu hoàn mỹ.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 shrink-0 w-full md:w-auto">
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 text-xs tracking-widest uppercase rounded-none border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-500">
                    Trải nghiệm mẫu
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-xs tracking-widest uppercase rounded-none bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-500">
                    Liên hệ đối tác
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-32 bg-background">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[60vh] md:h-[80vh] overflow-hidden"
          >
            <img 
              src="/images/tea-jar-editorial.png" 
              alt="Vietnamese tea jar with QR code" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex justify-between items-center mt-6 text-xs text-muted-foreground font-light tracking-wider uppercase border-b border-border/40 pb-6">
            <span>Sản phẩm mẫu 01</span>
            <span>Gốm sứ Bát Tràng · Truy xuất Nguồn gốc</span>
          </div>
        </div>
      </section>

      {/* Philosophy & Products */}
      <section className="py-32 bg-background border-t border-border/40">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            <div className="lg:col-span-4 space-y-8">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Triết lý của chúng tôi
              </div>
              <h2 className="text-3xl md:text-5xl font-serif text-primary leading-tight">
                Năm sản phẩm.<br/>Một triết lý duy nhất.
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed">
                Mỗi quy định pháp luật mới không phải là gánh nặng, mà là cơ hội để kể câu chuyện về sự tận tâm của thương hiệu. Chúng tôi biến sự tuân thủ thành nghệ thuật.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 space-y-0">
              {[
                {
                  num: "01",
                  title: "Trace",
                  desc: "Truy xuất nguồn gốc 10 trường thông tin (TT 02/2024)",
                  href: "/trace"
                },
                {
                  num: "02",
                  title: "E-label",
                  desc: "Nhãn điện tử đa ngôn ngữ thay thế nhãn giấy (NĐ 37/2026)",
                  href: "/e-label"
                },
                {
                  num: "03",
                  title: "DPP",
                  desc: "Hộ chiếu số sản phẩm xuất khẩu Châu Âu (ESPR 2024)",
                  href: "/dpp"
                },
                {
                  num: "04",
                  title: "F&B",
                  desc: "Lưu mẫu thức ăn nhà hàng & bếp ăn (QĐ 1246)",
                  href: "/fnb"
                },
                {
                  num: "05",
                  title: "Tem phụ",
                  desc: "Tem phụ số cho hàng nhập khẩu, giữ trọn bao bì gốc",
                  href: "/tem-phu"
                }
              ].map((product, i) => (
                <Link key={i} href={product.href} className="block group">
                  <div className="border-b border-border/40 py-10 flex flex-col md:flex-row md:items-baseline gap-6 md:gap-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    
                    <div className="relative z-10 text-3xl font-serif text-muted-foreground/30 font-light italic w-12">
                      {product.num}
                    </div>
                    <div className="relative z-10 flex-1 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                      <h3 className="text-3xl md:text-4xl font-serif text-primary group-hover:text-secondary transition-colors duration-500">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light italic md:text-right">
                        {product.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Layout Stats */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="space-y-6">
              <h3 className="text-6xl md:text-7xl font-serif font-light text-accent">2.5<span className="text-4xl">M</span></h3>
              <div className="h-px w-12 bg-white/20" />
              <p className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium">Mã QR đã được khởi tạo</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-6xl md:text-7xl font-serif font-light text-accent">850</h3>
              <div className="h-px w-12 bg-white/20" />
              <p className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium">Thương hiệu đồng hành</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-6xl md:text-7xl font-serif font-light text-accent">05</h3>
              <div className="h-px w-12 bg-white/20" />
              <p className="text-xs tracking-[0.2em] uppercase text-white/60 font-medium">Tiêu chuẩn pháp lý đáp ứng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Specimen */}
      <section className="py-32 bg-background">
        <div className="container px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="/images/coffee-package-editorial.png" 
                alt="Luxury coffee package with QR" 
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
            
            <div className="order-1 lg:order-2 space-y-16">
              <div className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                Tinh giản quy trình
              </div>
              
              <div className="space-y-12">
                {[
                  { num: "I.", title: "Thiết lập định danh", desc: "Khai báo thông tin sản phẩm theo các tiêu chuẩn pháp lý khắt khe nhất." },
                  { num: "II.", title: "Sinh mã thông minh", desc: "Hệ thống tự động biên dịch dữ liệu thành giao diện hiển thị sang trọng." },
                  { num: "III.", title: "Khẳng định thương hiệu", desc: "Tem QR nhỏ gọn được đính kết lên bao bì, mở ra không gian tương tác vô tận." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-sm font-serif italic text-muted-foreground pt-1">{step.num}</div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-serif text-primary">{step.title}</h3>
                      <p className="text-muted-foreground font-light text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-8">
                <Link href="/demo">
                  <Button variant="link" className="px-0 text-accent hover:text-accent/80 font-serif italic text-lg uppercase tracking-wider">
                    Khởi tạo trải nghiệm <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
