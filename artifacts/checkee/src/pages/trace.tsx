import { Link } from "wouter";
import { CtaButton } from "@/components/ui/cta-button";
import { TrialButton } from "@/components/ui/trial-button";
import { ProductHero } from "@/components/layout/product-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileCheck, Award, Workflow, Database, Globe, QrCode, MapPin, Languages, BarChart3, Shield, ShieldCheck, ArrowRight } from "lucide-react";

export default function Trace() {
  return (
    <div className="flex flex-col w-full bg-white">
      <ProductHero
        eyebrow="Trace"
        title="Truy xuất nguồn gốc điện tử — Chuẩn quốc tế GS1/EPCIS"
        description="Giải pháp truy xuất chuẩn mực, đáp ứng trọn vẹn 10 trường thông tin bắt buộc theo Thông tư 02/2024 — minh bạch toàn bộ chuỗi cung ứng."
        image="/images/hero-coffee.png"
        imageAlt="Truy xuất nguồn gốc"
        badge={{ icon: ShieldCheck, label: "Đã xác thực · GS1 · TT 02/2024" }}
        stats={[
          { value: "10/10", label: "Trường thông tin bắt buộc" },
          { value: "GS1", label: "Chuẩn quốc tế EPCIS" },
          { value: "5,000+", label: "Sản phẩm đã triển khai" },
        ]}
      />

     
      {/* 6 NGÀNH ÁP DỤNG */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">

            <h2 className="text-3xl lg:text-5xl font-bold text-[#1557B0] leading-tight">Hệ sinh thái Checkee Trace theo ngành</h2>
            <p className="text-[#4A5868] text-base lg:text-lg mt-5 leading-relaxed">
              Mỗi ngành hàng có đặc thù riêng. Checkee phát triển bộ giải pháp chuyên biệt — từ vùng trồng đến tay người tiêu dùng cuối.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              {
                code: "AGR",
                tag: "Nông sản",
                title: "Checkee AGR",
                desc: "Số hóa toàn bộ quy trình từ vùng trồng — thu hoạch — chế biến — phân phối. Kết nối Cổng TXNG Quốc gia, hỗ trợ EUDR, GlobalGAP, VietGAP.",
                standards: ["TCVN 12850:2019", "GS1", "EUDR"],
                img: "/images/industry-agr.png",
              },
              {
                code: "MEAT",
                tag: "Thịt & Chăn nuôi",
                title: "Checkee MEAT",
                desc: "Định danh từng cá thể bằng thẻ tai QR. Theo dõi xuyên suốt từ trang trại — thú y — giết mổ — vận chuyển — phân phối.",
                standards: ["TCVN 13274–13275", "HACCP", "ISO 22000"],
                img: "/images/industry-meat.png",
              },
              {
                code: "SEAFOOD",
                tag: "Thủy sản",
                title: "Checkee SEAFOOD",
                desc: "Từ vùng nuôi / tàu khai thác đến nhà máy chế biến và xuất khẩu. Hỗ trợ hồ sơ IUU, ATTP và thị trường quốc tế.",
                standards: ["IUU", "ATTP", "GS1", "ESG"],
                img: "/images/industry-seafood.png",
              },
              {
                code: "PRO",
                tag: "Hàng tiêu dùng",
                title: "Checkee PRO",
                desc: "Truy xuất nguồn gốc cho thực phẩm chế biến, đồ uống, mỹ phẩm, OCOP. Sẵn sàng vào siêu thị và sàn thương mại điện tử.",
                standards: ["TCVN", "GS1", "OCOP"],
                img: "/images/industry-pro.png",
              },
              {
                code: "MED",
                tag: "Dược phẩm",
                title: "Checkee MED",
                desc: "Định danh từng đơn vị thuốc bằng Data Matrix. Quản lý theo lô — hạn dùng, chống hàng giả và hỗ trợ thu hồi chính xác.",
                standards: ["Data Matrix", "GS1", "Cục Dược"],
                img: "/images/industry-med.png",
              },
              {
                code: "IND",
                tag: "Khí công nghiệp",
                title: "Checkee IND",
                desc: "Quản lý vòng đời bình gas / bồn chứa từ chiết nạp — vận chuyển — sử dụng — thu hồi. Minh bạch an toàn và trách nhiệm pháp lý.",
                standards: ["Vòng đời sản phẩm", "An toàn công nghiệp"],
                img: "/images/industry-ind.png",
              },
            ].map((ind, i) => (
              <div key={i} className="group bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="aspect-[5/3] overflow-hidden relative">
                  <img src={ind.img} alt={ind.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[#1557B0] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                    {ind.code}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[10px] uppercase tracking-widest font-semibold text-[#7D9E94] mb-2">{ind.tag}</div>
                  <h3 className="font-bold text-[#1557B0] text-xl mb-3">{ind.title}</h3>
                  <p className="text-[#4A5868] text-sm leading-relaxed mb-4 flex-1">{ind.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {ind.standards.map((s, j) => (
                      <span key={j} className="text-[10px] font-semibold bg-[#EFF5FF] text-[#1557B0] px-2 py-1 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E5EAF0]">
                    <Link href="/demo" className="text-[#ed8302] font-semibold text-sm hover:text-[#1557B0] inline-flex items-center gap-1">
                      Dùng thử miễn phí <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link href="/contact" className="text-[#1557B0] font-semibold text-sm hover:text-[#1557B0] inline-flex items-center gap-1">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Lợi ích */}
      <section className="py-24 bg-[#FAFBFC]">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-4">LỢI ÍCH</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1557B0] leading-tight">Biến tuân thủ thành lợi thế</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Xây dựng thương hiệu", desc: "Chứng minh chất lượng thông qua dữ liệu thực. Gia tăng niềm tin và sự trung thành của người tiêu dùng." },
              { icon: Workflow, title: "Kiểm soát chuỗi cung ứng", desc: "Theo dõi dòng chảy sản phẩm từ nguyên liệu đến tay người tiêu dùng cuối. Phát hiện kịp thời rủi ro đứt gãy." },
              { icon: Database, title: "Dữ liệu người tiêu dùng", desc: "Thu thập dữ liệu quét QR để phân tích hành vi, vị trí địa lý, hỗ trợ chiến lược marketing chính xác." },
              { icon: Globe, title: "Sẵn sàng xuất khẩu", desc: "Đáp ứng tiêu chuẩn truy xuất nguồn gốc của các thị trường khó tính như EU, Mỹ, Nhật Bản." }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5EAF0] rounded-2xl p-7 hover:shadow-xl transition-shadow">
                <div className="bg-[#EFF5FF] text-[#1557B0] w-12 h-12 flex items-center justify-center rounded-xl mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1557B0] text-lg mb-3">{item.title}</h3>
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
            <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-4">TÍNH NĂNG</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1557B0] leading-tight">Công cụ toàn diện</h2>
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
                <feat.icon className="w-8 h-8 text-[#1557B0]" />
                <h4 className="text-[#0F1B2D] font-bold text-xl">{feat.title}</h4>
                <p className="text-[#4A5868] text-base leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#ed8302] uppercase tracking-widest text-xs font-semibold block mb-4">CÂU HỎI THƯỜNG GẶP</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1557B0] leading-tight">Giải đáp thắc mắc</h2>
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
                  <AccordionTrigger className="text-lg font-semibold text-[#1557B0]">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[#4A5868] text-base leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-[#1557B0] text-white text-center">
        <div className="container max-w-[1280px] mx-auto px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight">Khởi tạo quy trình chuẩn mực</h2>
          <p className="text-lg text-[#EFF5FF]/80 max-w-2xl mx-auto">
            Bảo vệ thương hiệu và mở rộng thị trường ngay hôm nay với Checkee Trace.
          </p>
          <div className="pt-4 flex flex-col items-center gap-4">
            <TrialButton size="large" />
          </div>
        </div>
      </section>
    </div>
  );
}