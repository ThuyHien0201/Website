import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/ui/cta-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, FileCheck, Award, Workflow, Database, Globe, QrCode, MapPin, Languages, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Trace() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-8 relative z-10">
              <div className="inline-block bg-[#D9EEF5] text-[#0B4F6C] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                TRUY XUẤT NGUỒN GỐC
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-[#0B4F6C] leading-tight">
                Truy xuất nguồn gốc điện tử — Chuẩn quốc tế GS1/EPCIS
              </h1>
              <p className="text-[#4A5868] text-lg max-w-xl leading-relaxed">
                Checkee Trace cung cấp giải pháp truy xuất nguồn gốc chuẩn mực, đáp ứng trọn vẹn 10 trường thông tin bắt buộc, minh bạch chuỗi cung ứng theo tiêu chuẩn quốc gia và quốc tế.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CtaButton href="/demo">Dùng thử miễn phí</CtaButton>
                <Link href="/pricing">
                  <Button variant="outline" className="rounded-full border-2 border-[#0B4F6C] text-[#0B4F6C] hover:bg-[#0B4F6C] hover:text-white px-6 py-3 h-auto font-semibold">
                    Xem bảng giá
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl shadow-xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px]">
                <img src="/images/hero-coffee.png" alt="Truy xuất" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Callout */}
      <section className="py-12 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="bg-[#D9EEF5] rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0">
              <FileCheck className="w-8 h-8 text-[#0B4F6C]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#0B4F6C] mb-3">Tuân thủ đầy đủ quy định pháp luật</h3>
              <p className="text-[#0B4F6C]/80 text-base leading-relaxed">
                Hệ thống được thiết kế dựa trên Thông tư 02/2024/TT-BKHCN, Quyết định 100/QĐ-TTg, TCVN 12850:2019 và chuẩn dữ liệu toàn cầu GS1 EPCIS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lợi ích */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">LỢI ÍCH</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Biến tuân thủ thành lợi thế</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Xây dựng thương hiệu", desc: "Chứng minh chất lượng thông qua dữ liệu thực. Gia tăng niềm tin và sự trung thành của người tiêu dùng." },
              { icon: Workflow, title: "Kiểm soát chuỗi cung ứng", desc: "Theo dõi dòng chảy sản phẩm từ nguyên liệu đến tay người tiêu dùng cuối. Phát hiện kịp thời rủi ro đứt gãy." },
              { icon: Database, title: "Dữ liệu người tiêu dùng", desc: "Thu thập dữ liệu quét QR để phân tích hành vi, vị trí địa lý, hỗ trợ chiến lược marketing chính xác." },
              { icon: Globe, title: "Sẵn sàng xuất khẩu", desc: "Đáp ứng tiêu chuẩn truy xuất nguồn gốc của các thị trường khó tính như EU, Mỹ, Nhật Bản." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5EAF0] rounded-2xl p-7 hover:shadow-xl transition-shadow">
                <div className="bg-[#D4EDE6] text-[#1A6B52] w-12 h-12 flex items-center justify-center rounded-xl mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#0B4F6C] text-lg mb-3">{item.title}</h3>
                <p className="text-[#4A5868] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tính năng */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">TÍNH NĂNG</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Công cụ toàn diện</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: QrCode, title: "QR Code bảo mật", desc: "Sinh mã hàng loạt, mã QR động có khả năng chống giả, cập nhật thông tin không cần đổi mã in." },
              { icon: FileCheck, title: "Ghi nhật ký số", desc: "Số hóa nhật ký sản xuất, chăm sóc, thu hoạch, chế biến ngay trên điện thoại." },
              { icon: MapPin, title: "Bản đồ hành trình", desc: "Trực quan hóa chuỗi vận chuyển qua giao diện bản đồ thân thiện với người dùng." },
              { icon: Languages, title: "Giao diện đa ngôn ngữ", desc: "Tự động phát hiện và chuyển đổi ngôn ngữ hiển thị theo thiết bị của người quét." },
              { icon: BarChart3, title: "Phân tích dữ liệu", desc: "Báo cáo chi tiết lượt quét, vị trí, thiết bị và cảnh báo quét mã bất thường." },
              { icon: Shield, title: "Blockchain Ready", desc: "Tùy chọn lưu trữ dữ liệu lên blockchain để đảm bảo tính bất biến của thông tin truy xuất." }
            ].map((feat, i) => (
              <div key={i} className="space-y-4">
                <feat.icon className="w-8 h-8 text-[#1A7EA4]" />
                <h4 className="text-[#0F1B2D] font-bold text-xl">{feat.title}</h4>
                <p className="text-[#4A5868] text-base leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C45B17] uppercase tracking-widest text-xs font-semibold block mb-4">CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#0B4F6C] leading-tight">Giải đáp thắc mắc</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Hệ thống có kết nối Cổng thông tin truy xuất quốc gia không?", a: "Có. Checkee Trace đã được thiết kế tuân thủ tiêu chuẩn để sẵn sàng tích hợp với Cổng thông tin truy xuất nguồn gốc sản phẩm, hàng hóa quốc gia." },
                { q: "Nhà cung cấp/nông dân của tôi có phải dùng phần mềm phức tạp không?", a: "Không. Chúng tôi có phân hệ di động cực kỳ đơn giản cho người trực tiếp sản xuất/thu hoạch, chỉ cần mở Zalo/Camera quét mã là có thể ghi nhận nhật ký sản xuất trong 3 giây." },
                { q: "Mã QR in rồi có sửa thông tin được không?", a: "Được. Mã QR của Checkee là mã động (Dynamic QR). Bạn có thể sửa nội dung hiển thị, cập nhật lô mới, thêm chứng nhận mà không cần phải in lại bao bì." },
                { q: "Làm sao để chống làm giả mã QR?", a: "Chúng tôi có tùy chọn mã QR chứa mã PIN cào ẩn hoặc mã phủ cào. Ngoài ra, hệ thống tự động cảnh báo trên dashboard nếu một mã QR bị quét quá nhiều lần ở nhiều địa điểm khác nhau trong thời gian ngắn." }
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

      {/* CTA Strip */}
      <section className="py-24 bg-[#0B4F6C] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Khởi tạo quy trình chuẩn mực</h2>
          <p className="text-lg text-[#D9EEF5]/80 max-w-2xl mx-auto">
            Bảo vệ thương hiệu và mở rộng thị trường ngay hôm nay với Checkee Trace.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <CtaButton href="/demo" size="large">Dùng thử miễn phí</CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
}