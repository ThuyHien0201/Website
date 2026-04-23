import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, QrCode, ShieldCheck, Award, FileCheck, Globe, MapPin, Languages, BarChart3, Database, Shield, Quote, ArrowRight, Users, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. HERO */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-8 relative z-10">
              <div className="inline-block bg-[#D9EEF5] text-[#0B4F6C] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Nền tảng minh bạch sản phẩm Việt
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0B4F6C] leading-tight">
                Truy xuất nguồn gốc —<br/>Niềm tin được chứng thực
              </h1>
              <p className="text-[#4A5868] text-lg max-w-xl leading-relaxed">
                Bảo vệ thương hiệu khỏi hàng giả, minh bạch chuỗi cung ứng và đáp ứng hoàn hảo các tiêu chuẩn pháp lý khắt khe nhất: Thông tư 02/2024/TT-BKHCN và Quy định ESPR EU 2024.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CtaButton href="/demo">Dùng thử miễn phí</CtaButton>
                <Link href="/pricing">
                  <Button variant="outline" className="rounded-full border-2 border-[#0B4F6C] text-[#0B4F6C] hover:bg-[#0B4F6C] hover:text-white px-6 py-3 h-auto font-semibold">
                    Xem bảng giá
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-8 pt-8 border-t border-[#E5EAF0]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4EDE6] text-[#1A6B52] flex items-center justify-center"><CheckCircle2 className="w-5 h-5"/></div>
                  <div><div className="font-bold text-[#0B4F6C]">5,000+</div><div className="text-xs text-[#7D9E94]">Sản phẩm</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4EDE6] text-[#1A6B52] flex items-center justify-center"><Award className="w-5 h-5"/></div>
                  <div><div className="font-bold text-[#0B4F6C]">200+</div><div className="text-xs text-[#7D9E94]">Doanh nghiệp</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4EDE6] text-[#1A6B52] flex items-center justify-center"><ShieldCheck className="w-5 h-5"/></div>
                  <div><div className="font-bold text-[#0B4F6C]">TT 02/2024</div><div className="text-xs text-[#7D9E94]">Tuân thủ</div></div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl shadow-xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px]">
                <img src="/images/hero-coffee.png" alt="Sản phẩm được xác thực" className="w-full h-full object-cover" />
              </div>
              {/* Floating Cards */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-8 -right-6 lg:-right-12 bg-white p-4 rounded-xl shadow-lg border border-[#E5EAF0] flex items-center gap-3"
              >
                <div className="bg-[#D4EDE6] text-[#1A6B52] p-2 rounded-full"><CheckCircle2 className="w-5 h-5"/></div>
                <div>
                  <div className="text-sm font-bold text-[#0F1B2D]">Đã xác thực</div>
                  <div className="text-xs text-[#7D9E94]">VietGAP · ISO 22000</div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-12 -left-6 lg:-left-12 bg-white p-4 rounded-xl shadow-lg border border-[#E5EAF0] flex items-center gap-3"
              >
                <div className="bg-[#D9EEF5] text-[#0B4F6C] p-2 rounded-full"><QrCode className="w-5 h-5"/></div>
                <div>
                  <div className="text-sm font-bold text-[#0F1B2D]">Đã quét 12,847 lần</div>
                  <div className="text-xs text-[#7D9E94]">Cập nhật 5 phút trước</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PARTNERS STRIP */}
      <section className="py-12 bg-[#FAFBFC] border-y border-[#E5EAF0]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-[#7D9E94] mb-8">Được tin dùng bởi 200+ doanh nghiệp Việt</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 font-bold text-xl text-[#0B4F6C]">
            <span>Vinamilk</span><span>TH True Milk</span><span>Vinatea</span><span>Vinamit</span><span>Trung Nguyên</span><span>Hapro</span><span>Saigon Co.op</span><span>Bách Hóa Xanh</span>
          </div>
        </div>
      </section>

      {/* 3. WHY */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">GIÁ TRỊ MANG LẠI</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Vì sao doanh nghiệp Việt cần truy xuất nguồn gốc?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Bảo vệ người tiêu dùng", desc: "Loại bỏ hàng giả, hàng nhái khỏi thị trường, mang đến sự an tâm tuyệt đối cho khách hàng cuối." },
              { icon: Award, title: "Nâng tầm thương hiệu", desc: "Minh bạch chuỗi cung ứng tạo dựng niềm tin và sự khác biệt cạnh tranh." },
              { icon: FileCheck, title: "Tuân thủ pháp luật", desc: "Đáp ứng Thông tư 02/2024/TT-BKHCN, Đề án 100/QĐ-TTg và quy định ESPR EU 2024." },
              { icon: Globe, title: "Mở cửa xuất khẩu", desc: "Vượt rào cản kỹ thuật vào thị trường EU, Hoa Kỳ, Nhật Bản và Hàn Quốc." }
            ].map((item, i) => (
              <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white border border-[#E5EAF0] rounded-2xl p-7 hover:shadow-xl transition-shadow">
                <div className="bg-[#D4EDE6] text-[#1A6B52] w-12 h-12 flex items-center justify-center rounded-xl mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0B4F6C] text-lg mb-3">{item.title}</h3>
                <p className="text-[#4A5868] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS TIMELINE */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">QUY TRÌNH 4 BƯỚC</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Triển khai chỉ trong 7 ngày</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Khảo sát", desc: "Phân tích nhu cầu, ngành hàng, quy mô." },
              { num: "02", title: "Cấu hình", desc: "Thiết lập chuỗi truy xuất theo tiêu chuẩn GS1/EPCIS." },
              { num: "03", title: "Tạo QR", desc: "Sinh mã QR động, in ấn theo lô." },
              { num: "04", title: "Vận hành", desc: "Theo dõi dashboard, đo lường, tối ưu." }
            ].map((step, i) => (
              <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                <div className="bg-[#C45B17] text-white w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto md:mx-0 z-10 relative">{step.num}</div>
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-[#0B4F6C] text-lg mb-2">{step.title}</h4>
                  <p className="text-[#4A5868] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCTS */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">5 SẢN PHẨM</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Giải pháp QR cho mọi quy mô doanh nghiệp</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: "/images/hero-tea.png", tag: "TT 02/2024", title: "Checkee Trace", desc: "Truy xuất nguồn gốc minh bạch", href: "/trace" },
              { img: "/images/hero-factory.png", tag: "NĐ 43", title: "Checkee E-label", desc: "Nhãn điện tử đa ngôn ngữ", href: "/e-label" },
              { img: "/images/hero-lacquer.png", tag: "EU 2024", title: "Checkee DPP", desc: "Hộ chiếu số xuất khẩu", href: "/dpp" },
              { img: "/images/hero-rice.png", tag: "NĐ 15", title: "Checkee F&B", desc: "Lưu mẫu thức ăn nhà hàng", href: "/fnb" },
              { img: "/images/hero-silk.png", tag: "NĐ 43 phụ", title: "Checkee Tem phụ", desc: "Nhãn phụ số hoá", href: "/tem-phu" }
            ].map((prod, i) => (
              <motion.div key={i} whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden border border-[#E5EAF0] hover:shadow-xl transition-all bg-white group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-[#7D9E94] mb-3">{prod.tag}</div>
                  <h3 className="font-bold text-[#0B4F6C] text-xl mb-2">{prod.title}</h3>
                  <p className="text-[#4A5868] text-sm mb-4">{prod.desc}</p>
                  <Link href={prod.href} className="text-[#1A7EA4] font-semibold hover:text-[#0B4F6C] inline-flex items-center group-hover:gap-2 transition-all">
                    Tìm hiểu <ArrowRight className="ml-1 w-4 h-4"/>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURES */}
      <section className="py-24 bg-[#0B4F6C] text-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#D9EEF5] uppercase tracking-widest text-xs font-semibold block mb-4">TÍNH NĂNG NỔI BẬT</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Bộ công cụ toàn diện cho thương hiệu hiện đại</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: QrCode, title: "QR động", desc: "Mã QR cập nhật theo lô, không tái sử dụng được." },
              { icon: MapPin, title: "Bản đồ hành trình", desc: "Hiển thị chuỗi cung ứng dạng bản đồ trực quan." },
              { icon: Languages, title: "Đa ngôn ngữ", desc: "Hỗ trợ 8 ngôn ngữ: VI/EN/FR/DE/JP/KO/ZH/TH." },
              { icon: BarChart3, title: "Dashboard phân tích", desc: "Theo dõi lượt quét, vị trí, hành vi NTD." },
              { icon: Database, title: "API tích hợp", desc: "Kết nối ERP/POS/SAP qua REST API & webhook." },
              { icon: Shield, title: "Chống giả mạo", desc: "Mã hash bất biến, blockchain anchor tùy chọn." }
            ].map((feat, i) => (
              <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} className="space-y-4">
                <feat.icon className="w-10 h-10 text-[#C45B17]" />
                <h4 className="text-white font-semibold text-lg">{feat.title}</h4>
                <p className="text-[#D9EEF5]/80 text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-[#F5E8DC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">KHÁCH HÀNG TIN DÙNG</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Doanh nghiệp Việt đã chọn Checkee</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "Sau 3 tháng triển khai Checkee, lượng phản ánh hàng giả giảm 78%. Người tiêu dùng chủ động quét QR trước khi mua.", name: "Nguyễn Thị Hồng", role: "Giám đốc Marketing, Vinamit", init: "NH" },
              { quote: "Checkee giúp chúng tôi vượt qua kiểm định ESPR khi xuất khẩu sang EU. Quy trình chuẩn quốc tế nhưng giá Việt Nam.", name: "Trần Quốc Hưng", role: "CEO, Cà Phê Mê Trang", init: "TH" },
              { quote: "Dashboard Checkee cho dữ liệu thật theo từng lô. Chúng tôi tối ưu được kênh phân phối nhờ insights này.", name: "Lê Minh Anh", role: "COO, Hapro", init: "LA" }
            ].map((test, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                <Quote className="w-8 h-8 text-[#C45B17]" />
                <p className="italic text-[#0F1B2D] text-base leading-relaxed">"{test.quote}"</p>
                <div className="h-[1px] w-full bg-[#E5EAF0]"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D9EEF5] text-[#0B4F6C] font-bold flex items-center justify-center">{test.init}</div>
                  <div>
                    <div className="font-semibold text-[#0B4F6C]">{test.name}</div>
                    <div className="text-xs text-[#7D9E94]">{test.role}</div>
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
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Mọi thắc mắc của bạn</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Chi phí triển khai bao nhiêu?", a: "Chi phí triển khai phụ thuộc vào quy mô và nhu cầu thực tế của doanh nghiệp, bắt đầu từ gói Khởi đầu rất dễ tiếp cận. Chúng tôi tính phí minh bạch dựa trên số lượng mã QR và sản phẩm." },
                { q: "Mất bao lâu để triển khai?", a: "Toàn bộ quy trình từ khảo sát, thiết lập hệ thống đến khi in ấn mã QR đầu tiên chỉ mất trung bình 7 ngày làm việc cho doanh nghiệp quy mô vừa." },
                { q: "Checkee tích hợp được với hệ thống ERP/POS hiện tại?", a: "Có. Checkee cung cấp hệ thống API RESTful và Webhook mạnh mẽ, sẵn sàng kết nối liền mạch với các hệ thống ERP, SAP, POS hiện có của doanh nghiệp." },
                { q: "Sản phẩm có đáp ứng Thông tư 02/2024 không?", a: "Checkee Trace được thiết kế với sự tư vấn của các chuyên gia pháp lý, tuân thủ 100% các yêu cầu về trường thông tin định danh và truy xuất theo Thông tư 02/2024/TT-BKHCN." },
                { q: "Checkee có hỗ trợ kỹ thuật không?", a: "Đội ngũ hỗ trợ kỹ thuật của chúng tôi sẵn sàng 24/7 thông qua hotline và email để đảm bảo hệ thống vận hành liên tục và ổn định." }
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

      {/* 9. FINAL CTA */}
      <section className="py-24 bg-[#0B4F6C] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Sẵn sàng nâng tầm thương hiệu của bạn?</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Bắt đầu minh bạch hóa chuỗi cung ứng và gia tăng niềm tin của khách hàng ngay hôm nay.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <CtaButton href="/demo" size="large">Dùng thử miễn phí 14 ngày</CtaButton>
            <p className="text-sm text-[#D9EEF5]/60 mt-2">Không cần thẻ tín dụng · Hủy bất kỳ lúc nào</p>
          </div>
        </div>
      </section>
    </div>
  );
}